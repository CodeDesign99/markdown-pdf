import { http } from "/@/utils/http/http";

/** 登录 */
export const getCodeText = (params?: object) => {
  return http.request("get", "/getCodeText", { params });
};
