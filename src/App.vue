<template>
  <!-- 其他内容可以放在背景组件下面 -->
  <router-view />
</template>

<script>

export default {
name:'App',
}
</script>

<style>
/* 在App.vue的style中添加 */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  position: relative;
  width: 100%;
  height: 100%;
}

</style>