<!-- components/Pagination.vue -->
<template>
  <div class="pagination-wrapper">
    <div class="pagination-container">
      <button
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="handlePageChange(currentPage - 1)"
      >
        «
      </button>

      <template v-for="page in pages" :key="page">
        <button
          class="pagination-btn"
          :class="{ active: page === currentPage }"
          @click="handlePageChange(page)"
        >
          {{ page }}
        </button>
      </template>

      <button
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="handlePageChange(currentPage + 1)"
      >
        »
      </button>
    </div>

    <div class="page-size-selector" v-if="showSizeSelector">
      <span>每页显示：</span>
      <select v-model="localPageSize" @change="handleSizeChange">
        <option v-for="size in pageSizeOptions" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  pageSize: { type: Number, required: true },
  total: { type: Number, required: true },
  showSizeSelector: { type: Boolean, default: true },
  pageSizeOptions: {
    type: Array,
    default: () => [8, 16, 24, 32]
  }
})

const emit = defineEmits(['update:currentPage', 'update:pageSize'])

const localPageSize = ref(props.pageSize)

// 计算总页数
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

// 生成页码数组（可优化显示逻辑）
const pages = computed(() => {
  const range = []
  for(let i = 1; i <= totalPages.value; i++) {
    range.push(i)
  }
  return range
})

// 页码变更
const handlePageChange = (newPage) => {
  if(newPage < 1 || newPage > totalPages.value) return
  emit('update:currentPage', newPage)
}

// 每页条数变更
const handleSizeChange = () => {
  emit('update:pageSize', localPageSize.value)
  emit('update:currentPage', 1) // 切换条数时回到第一页
}
</script>

<style lang="scss" scoped>
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pagination-container {
  display: flex;
  gap: 0.5rem;
}

.pagination-btn {
  padding: 8px 12px;
  border: 1px solid #ffb3c6;
  border-radius: 4px;
  background: white;
  color: #d04a6c;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #fff0f3;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background: #ff758f;
    color: white;
    border-color: #ff758f;
  }
}

.page-size-selector {
  select {
    padding: 6px;
    border: 1px solid #ffb3c6;
    border-radius: 4px;
    color: #d04a6c;
  }
}
</style>