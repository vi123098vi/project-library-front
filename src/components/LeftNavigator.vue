<template>
  <!-- 左侧导航栏 -->
  <el-menu
    class="left-sakura-nav"
    :default-active="activeIndex"
    mode="vertical"
    router
    exact
  >
    <!-- 导航项 -->
    <el-menu-item index="/user-profile/borrow-all">
      <i class="el-icon-data-line"></i>
      <span>📊 借阅历史统计</span>
    </el-menu-item>

    <el-menu-item index="/user-profile/current-borrow">
      <i class="el-icon-notebook-2"></i>
      <span>📖 当前借阅记录</span>
    </el-menu-item>

    <el-menu-item index="/user-profile/userinfo">
      <i class="el-icon-user"></i>
      <span>👤 个人资料卡片</span>
    </el-menu-item>

    <el-menu-item index="/user-profile/settings">
      <i class="el-icon-setting"></i>
      <span>⚙️ 个人账户设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>

defineProps({
  activeIndex: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.left-sakura-nav {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 200px;
  background: linear-gradient(to bottom, #ffd6e7, #ffe6f0);
  border-right: 2px solid #ffb3c6;
  padding: 20px 0;

  .el-menu-item {
    height: 56px;
    line-height: 56px;
    font-size: 1.1rem;
    color: #d04a6c;
    transition: all 0.3s;
    margin: 8px 8px;
    border-radius: 12px;

    &:hover {
      background-color: #ffecf1 !important;
      transform: translateX(5px);
      box-shadow: 2px 2px 8px rgba(208,74,108,0.1);
    }

    &.is-active {
      background: #ff758f !important;
      color: white !important;
      font-weight: bold;
    }

    i {
      margin-right: 12px;
      font-size: 1.4rem;
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
    }
  }
}
</style>