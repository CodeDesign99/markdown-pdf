<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <!-- 添加其他导航链接 -->
    </ul>
  </nav>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.navbar {
  background-color: #333;
  color: #fff;
}
ul {
  display: flex;
  list-style: none;
  padding: 0;
}
li {
  margin-right: 20px;
}
a {
  color: #fff;
  text-decoration: none;
}
</style>
