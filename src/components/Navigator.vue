<template>
  <el-menu
    mode="horizontal"
    class="sakura-nav"
    :default-active="activeIndex"
    router
    exact
  >
    <div class="nav-brand">
      <i class="el-icon-reading"></i>
      <span>🌸 Library-Pro 📖</span>
    </div>

    <div class="nav-items">
      <el-menu-item index="/main-page">🏠 首页</el-menu-item>
      <el-menu-item index="/book-list">📚 图书列表</el-menu-item>
      <el-menu-item index="/user-profile">🚨 个人信息</el-menu-item>
    </div>
  </el-menu>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from "vue-router";

const route = useRoute()
const activeIndex = ref(route.path)

watch(route, (newRoute) => {
  activeIndex.value = newRoute.path
})
</script>

<style lang="scss" scoped>
.sakura-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px; /* 新增固定高度 */
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  background: linear-gradient(to right, #ffd6e7, #fff0f6);
  border-bottom: 2px solid #ffb3c6;

  .nav-brand {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: #d04a6c;
    font-weight: bold;
    padding: 15px 0;

    i {
      margin-right: 10px;
      font-size: 1.8rem;
    }
  }

  .nav-items {
    display: flex;
    :deep(.el-menu-item) {
      font-size: 1.1rem;
      color: #d04a6c;
      transition: all 0.3s;

      &:hover {
        background-color: #ffe6ee;
        transform: scale(1.05);
      }

      &.is-active {
        color: #fff;
        background-color: #ff758f;
        border-radius: 15px;
      }
    }
  }
}
</style>