import type { Router, RouteLocationNormalized } from 'vue-router';
import { AxiosCanceler } from '/@/utils/http/axios/axiosCancel';
import { Modal, notification } from 'ant-design-vue';
import { unref } from 'vue';
import nProgress from 'nprogress';
import { DataInfo, sessionKey } from '/@/utils/auth';
import { storageSession } from '@pureadmin/utils';

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  // createPageLoadingGuard(router);
  // createHttpGuard(router);
  createScrollGuard(router);
  // createMessageGuard(router);
  // createProgressGuard(router);
  // createPermissionGuard(router);
  // createParamMenuGuard(router); // must after createPermissionGuard (menu has been built.)
  // createStateGuard(router);
}

/**
 * Hooks for handling page state
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();
  /** 路由白名单 */
  const whiteList = ["/login"];
  router.beforeEach(async (to, _from, next) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path);
    // Notify routing changes
    // setRouteChange(to);

    const userInfo = storageSession().getItem<DataInfo<number>>(sessionKey);
     /** 如果已经登录并存在登录信息后不能跳转到路由白名单，而是继续保持在当前页面 */
    function toCorrectRoute() {
      whiteList.includes(to.fullPath) ? next(_from.fullPath) : next();
    }
    if (userInfo) {
      // 无权限跳转403页面
      // if (to.meta?.roles && !isOneOfArray(to.meta?.roles, userInfo?.roles)) {
      //   next({ path: "/error/403" });
      // }
      toCorrectRoute();
    } else {
      if (to.path !== "/login") {
        if (whiteList.indexOf(to.path) !== -1) {
          next();
        } else {
          next({ path: "/login" });
        }
      } else {
        next();
      }
    }
    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

// Used to handle page loading status
// function createPageLoadingGuard(router: Router) {
//   const userStore = useUserStoreWithOut();
//   const appStore = useAppStoreWithOut();
//   const { getOpenPageLoading } = useTransitionSetting();
//   router.beforeEach(async (to) => {
//     if (!userStore.getToken) {
//       return true;
//     }
//     if (to.meta.loaded) {
//       return true;
//     }

//     if (unref(getOpenPageLoading)) {
//       appStore.setPageLoadingAction(true);
//       return true;
//     }

//     return true;
//   });
//   router.afterEach(async () => {
//     if (unref(getOpenPageLoading)) {
//       // TODO Looking for a better way
//       // The timer simulates the loading time to prevent flashing too fast,
//       setTimeout(() => {
//         appStore.setPageLoading(false);
//       }, 220);
//     }
//     return true;
//   });
// }

/**
 * The interface used to close the current page to complete the request when the route is switched
 * @param router
 */
// function createHttpGuard(router: Router) {
//   const { removeAllHttpPending } = projectSetting;
//   let axiosCanceler: Nullable<AxiosCanceler>;
//   if (removeAllHttpPending) {
//     axiosCanceler = new AxiosCanceler();
//   }
//   router.beforeEach(async () => {
//     // Switching the route will delete the previous request
//     axiosCanceler?.removeAllPending();
//     return true;
//   });
// }

// Routing switch back to the top
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href);
  };

  const body = document.body;

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);
    return true;
  });
}

/**
 * Used to close the message instance when the route is switched
 * @param router
 */
// export function createMessageGuard(router: Router) {
//   const { closeMessageOnSwitch } = projectSetting;

//   router.beforeEach(async () => {
//     try {
//       if (closeMessageOnSwitch) {
//         Modal.destroyAll();
//         notification.destroy();
//       }
//     } catch (error) {
//       warn('message guard error:' + error);
//     }
//     return true;
//   });
// }

// export function createProgressGuard(router: Router) {
//   const { getOpenNProgress } = useTransitionSetting();
//   router.beforeEach(async (to) => {
//     if (to.meta.loaded) {
//       return true;
//     }
//     unref(getOpenNProgress) && nProgress.start();
//     return true;
//   });

//   router.afterEach(async () => {
//     unref(getOpenNProgress) && nProgress.done();
//     return true;
//   });
// }
