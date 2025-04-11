<!-- CardCarousel.vue -->
<template>
  <div class="card-carousel">
    <el-carousel
      :interval="5000"
      type="card"
      height="320px"
      indicator-position="none"
    >
      <el-carousel-item
        v-for="(item, index) in items"
        :key="index"
        :name="index"
      >
        <div class="card-item">
          <img :src="item.image" class="card-image" alt="图书封面">
          <div class="card-content">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-desc">{{ item.description }}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 自定义导航控件 -->
    <div class="custom-controls">
      <button class="control-btn prev" @click="prev">
        <i class="el-icon-arrow-left"></i>
      </button>
      <div class="pagination">
        <span
          v-for="i in items.length"
          :key="i"
          :class="{ active: activeIndex === i - 1 }"
        ></span>
      </div>
      <button class="control-btn next" @click="next">
        <i class="el-icon-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: value => value.every(item =>
      item.image && item.title && item.description
    )
  }
})

const activeIndex = ref(0)
const carouselRef = ref(null)

watch(activeIndex, (newVal) => {
  carouselRef.value?.setActiveItem(newVal)
})

const prev = () => {
  activeIndex.value = (activeIndex.value - 1 + props.items.length) % props.items.length
}

const next = () => {
  activeIndex.value = (activeIndex.value + 1) % props.items.length
}
</script>

<style lang="scss" scoped>
.card-carousel {
  position: relative;
  max-width: 1200px;
  margin: 2rem auto;

  :deep(.el-carousel) {
    .el-carousel__container {
      height: 360px;
    }

    .el-carousel__item {
      transition: transform 0.35s ease-in-out;

      &.is-active {
        z-index: 2;
        transform: scale(1);

        .card-item {
          background: #d04a6c;
        }
      }

      &:not(.is-active) {
        transform: scale(0.85);
        opacity: 0.6;

        .card-item {
          background: #ffe6ee;
        }
      }
    }
  }

  .card-item {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(208, 74, 108, 0.15);
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .card-image {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
  }

  .card-content {
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-title {
    color: white;
    margin: 0;
    font-size: 1.4rem;
  }

  .card-desc {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 1rem 0 0;
  }

  .custom-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    gap: 2rem;
  }

  .control-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #ffb3c6;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #ff758f;
      border-color: #ff758f;

      i {
        color: white;
      }
    }

    i {
      color: #d04a6c;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }

  .pagination {
    display: flex;
    gap: 0.8rem;

    span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ffb3c6;
      opacity: 0.4;
      transition: all 0.3s ease;

      &.active {
        opacity: 1;
        transform: scale(1.2);
      }
    }
  }
}
</style>