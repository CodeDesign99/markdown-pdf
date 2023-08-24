<template lang="">
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'appMain',
  setup(props) {

  }
})
</script>
<style lang="scss" scoped>
.app-main {
  height: calc(100% - $header-height);
}
</style>
