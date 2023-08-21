<template>
  <div>
    <Navbar />
  </div>
</template>
<script lang="ts" setup>
import { log } from 'console';
import Navbar from './Navbar.vue';
import { getCodeText } from '/@/api/text';
import { useUserStoreHook } from '/@/store/modules/user';

const userStore = useUserStoreHook()
getCodeText({ id: userStore.id }).then(data => {
  console.log(data);
}).catch(console.log)
</script>
<style lang="">

</style>
