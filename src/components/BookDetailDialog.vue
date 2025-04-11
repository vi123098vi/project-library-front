<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog-content sakura-theme">
      <button class="close-btn" @click="$emit('closeDialog')">✿</button>
      <h2 class="dialog-title">{{ book.title }}</h2>
      <p class="dialog-author">📝 作者：{{ book.author }}</p>
      <p class="dialog-description">📖 简介：{{ book.description || '暂无介绍' }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  book:{
    type: Object,
    required: true
  }
})

const emit = defineEmits(['closeDialog']);

const closeDialog = () => {
  emit('update:visible', false)  // 正确触发更新
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(255, 182, 193, 0.3); /* 浅粉色半透明背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: linear-gradient(135deg, #fffafc, #ffe4ec); /* 淡淡渐变 */
  padding: 2rem;
  border-radius: 20px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 8px 30px rgba(208, 74, 108, 0.2); /* 粉色柔光阴影 */
  position: relative;
  animation: popUp 0.4s ease;
}

@keyframes popUp {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.sakura-theme {
  font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
  color: #d04a6c;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ffd5e5;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(208, 74, 108, 0.3);
  transition: background 0.3s;
}

.close-btn:hover {
  background: #ffc0cb;
}

.dialog-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
}

.dialog-author, .dialog-description {
  margin-bottom: 1rem;
  line-height: 1.6;
}
</style>
