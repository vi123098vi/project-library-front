<template>
  <div class="page-container">
    <Navigator />

  <div class="main-container">
    <LeftNavigator />

    <div class="content">
      <router-view>
        </router-view>
      </div>
  </div>
  </div>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue';
import LeftNavigator from "@/components/LeftNavigator.vue";
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  display: flex;
  flex: 1; /* 填充剩余垂直空间 */
  margin-top: 60px; /* 与顶部导航栏高度一致 */
}

.content {
  flex: 1; /* 填充左侧导航栏外的剩余空间 */
  padding: 24px;
  margin-left: 200px; /* 与左侧导航栏宽度一致 */
  min-height: calc(100vh - 60px); /* 全屏高度减去顶部导航栏 */
  background: #fff8fa; /* 背景色与设计保持一致 */
}
</style>