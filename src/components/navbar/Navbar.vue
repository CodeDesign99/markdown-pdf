<template>
  <header>
    <nav class="navbar">
      <div class="logo"><router-link to="/home">Markdown-PDF</router-link></div>
      <ul class="links">
        <li v-for="child in homeChildren" :key="child.path">
          <router-link :to="child.path">{{child.name}}</router-link>
        </li>
      </ul>
      <a class="active_btn" @click="logout">Logout</a>
      <div @click="toggle" class="toggle_btn">
        <i><bars v-if="!className.open" /><close v-else /></i>
      </div>
    </nav>
    <div :class="className">
      <li v-for="child in homeChildren" :key="child.path">
          <router-link :to="child.path">{{child.name}}</router-link>
        </li>
      <li><a class="active_btn" @click="logout">Logout</a></li>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import bars from "/@/assets/svg/menu.svg?component"
import close from "/@/assets/svg/close.svg?component"
import { useUserStoreHook } from "/@/store/modules/user";
import { homeChildren } from "/@/router/routes/modules/home";


export default defineComponent({
  name: 'Navbar',
  components: {bars, close},
  setup(props, { attrs, slots, emit, expose }) {
    const userStore = useUserStoreHook()
    const className = reactive({
      dropdown_menu: true,
      open: false
    })
    function toggle() {
      className.open = !className.open
    }
    function logout() {
      userStore.logOut()
    }
    return {
      className, logout, toggle, homeChildren
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  position: relative;
  padding: 0 2rem;
}
a {
  color: #fff;
  font-size: 1rem;
  &:hover {
    color: orange;
  }
}
.active_btn {
    background-color: orange;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    outline: none;
    border-radius: 20px;
    // font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    transition: scale 0.2 ease;
    &:hover {
      scale: 1.05;
      color: #fff;
    }
    &:active {
      scale: 0.95;
    }
  }
.navbar {
  width: 100%;
  height: $header-height;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo a {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .links {
    display: flex;
    gap: 2rem;
  }
  .toggle_btn {
    width: 1em;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
  }
}

.dropdown_menu {
  display: none;
  position: absolute;
  right: 2rem;
  top: 60px;
  width: 300px;
  height: 0;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  overflow: hidden;
  transition: height 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  li {
    padding: 0.7rem;
    text-align: center;
  }
  .active_btn {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  &.open {
    height: 220px;
  }
}

@media (max-width: 992px) {
  .navbar {
    .links, .active_btn {
      display: none;
    }
    .toggle_btn {
      display: block;
    }
  }
  .dropdown_menu {
    display: block;
  }
}

</style>
