<template>
  <!-- Settings.vue -->
  <div class="settings-container">
    <h2> ⚙ 账户设置</h2>
    <button
      @click="handleLogout"
      class="logout-btn"
    >
      退出登录
    </button>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const handleLogout = () => {
  store.dispatch('logout')
  window.location.reload()
}
</script>

<style>

.logout-btn {
  padding: 12px 24px;
  background: rgba(255, 71, 87, 0.96);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #ff6b81;
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>