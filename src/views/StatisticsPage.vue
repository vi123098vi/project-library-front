<template>
  <div class="layout-container">
    <AdminNavbar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'

export default {
  components: { AdminNavbar }
}
</script>

<style scoped>
.layout-container {
  display: flex; /* 横向排列！ */
  min-height: 100vh; /* 高度撑满整个屏幕 */
  margin-left: 200px;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #fff0f5;
  overflow-y: auto;
}

</style>