<!-- MainPage.vue -->
<template>
  <div class="page-container">
    <Navigator />
    <div>
      <PostCircle :images="carouselImages" />
    </div>
    <main class="content-wrapper">
      <!-- 纵向图书轮播 -->
      <section class="carousel-section">
        <h2 class="section-title">🌸 樱花书馆 · 新书推荐</h2>
        <div class="vertical-carousel">
          <div
            v-for="(book, index) in featuredBooks"
            :key="index"
            class="book-card"
          >
            <div class="book-image-wrapper">
              <img
                :src="book.image"
                :alt="book.title + '封面'"
                class="book-cover"
              />
              <div class="book-badge">新书推荐</div>
            </div>
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <div class="book-actions">
                <button class="detail-btn">查看详情</button>
                <button class="borrow-btn">立即借阅</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 快速入口 -->
      <section class="quick-access">
        <h2 class="section-title">🚪 快速服务入口</h2>
        <div class="service-grid">
          <div
            v-for="(item, index) in quickActions"
            :key="index"
            class="service-card"
            @click="handleAction(item.action)"
          >
            <div class="icon-bubble">
              <span class="service-icon">{{ item.icon }}</span>
            </div>
            <h3 class="service-title">{{ item.title }}</h3>
            <p class="service-description">{{ item.description }}</p>
          </div>
        </div>
      </section>

      <!-- 公告栏 -->
      <section class="announcement-section">
        <div class="sakura-notice">
          <div class="notice-header">
            <i class="el-icon-message-solid notice-icon"></i>
            <h3>📢 最新公告</h3>
          </div>
          <ul class="notice-list">
            <li
              v-for="(notice, index) in notices"
              :key="index"
              class="notice-item"
            >
              <i class="el-icon-caret-right"></i>
              {{ notice }}
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue'
import { ref } from 'vue'

//广告轮播图组件
import PostCircle from "@/components/PostCircle.vue";
const carouselImages = [
    require("@/assets/images/circle1.png"),
    require("@/assets/images/circle2.png"),
    require("@/assets/images/circle3.png")
];

// 图书数据（使用纵向比例图片）
const featuredBooks = ref([
  {
    image: require('@/assets/images/dong1.png'),
    title: '樱花与日本文学',
  },
  {
    image: require('@/assets/images/2.png'),
    title: '现代图书管理艺术',
  },
  {
    image: require('@/assets/images/4.png'),
    title: '古典文学珍藏集',
  }
])

// 快速入口配置
const quickActions = ref([
  {
    icon: '📚',
    title: '图书检索',
    description: '通过多维检索快速定位馆藏资源',
    action: 'search'
  },
  {
    icon: '📖',
    title: '我的借阅',
    description: '管理当前借阅与查看历史记录',
    action: 'borrow'
  },
  {
    icon: '💬',
    title: '读者服务',
    description: '在线咨询与空间预约服务',
    action: 'service'
  }
])

// 公告数据
const notices = ref([
  '2024年春季新书采购清单已发布',
  '图书馆暑期开放时间调整通知',
  '读者荐购系统升级完成，欢迎使用'
])

const handleAction = (action) => {
  console.log('执行操作:', action)
}
</script>

<style lang="scss" scoped>
/* 基础布局 */
.page-container {
  padding-top: 60px;
  background: linear-gradient(to bottom, #fff9fb, rgba(241, 202, 215, 0.94));
  min-height: 100vh;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 轮播区域优化 */
.vertical-carousel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.book-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(208, 74, 108, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.book-image-wrapper {
  position: relative;
  height: 380px; /* 适合纵向图书的比例 */
  overflow: hidden;
  border-radius: 16px 16px 0 0;

  .book-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &:hover .book-cover {
    transform: scale(1.05);
  }

  .book-badge {
    position: absolute;
    top: 15px;
    right: -30px;
    background: #ff758f;
    color: white;
    padding: 8px 40px;
    transform: rotate(45deg);
    font-size: 0.9rem;
  }
}

.book-info {
  padding: 1.5rem;

  .book-title {
    color: #d04a6c;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    height: 3em;
    overflow: hidden;
  }
}

.book-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  button {
    padding: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;

    &.detail-btn {
      background: #fff0f6;
      color: #ff758f;

      &:hover {
        background: #ffe6ee;
      }
    }

    &.borrow-btn {
      background: linear-gradient(45deg, #ff99cc, #ff758f);
      color: white;

      &:hover {
        box-shadow: 0 3px 10px rgba(255, 117, 143, 0.3);
      }
    }
  }
}

/* 其他部分保持原有优化 */
.quick-access {
  max-width: 1200px;
  margin: 3rem auto;

  .service-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 0 1rem;
  }

  .service-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid #ffe6ee;

    &:hover {
      box-shadow: 0 8px 25px rgba(208, 74, 108, 0.15);
      transform: translateY(-5px);

      .icon-wrapper {
        transform: scale(1.1);
      }
    }
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;
    background: #fff0f3;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    transition: transform 0.3s ease;
  }

  .service-icon {
    font-size: 2.5rem;
    color: #d04a6c;
  }

  .service-title {
    color: #d04a6c;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  .service-description {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.6;
  }
}

// 公告样式
.announcement-section {
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 1rem;

  .notice-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    overflow: hidden;
  }

  .notice-header {
    background: #fff0f3;
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #ffb3c6;
  }

  .notice-bell {
    font-size: 1.8rem;
    margin-right: 1rem;
    color: #d04a6c;
  }

  .notice-heading {
    color: #d04a6c;
    margin: 0;
    font-size: 1.4rem;
  }

  .notice-list {
    padding: 2rem;
  }

  .notice-item {
    color: #666;
    padding: 0.8rem 0;
    font-size: 1rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .notice-marker {
    color: #ff758f;
    margin-right: 1rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
  }

  .book-card {
    margin-bottom: 1rem;
  }

  .service-grid {
    grid-template-columns: 1fr;
  }
}


</style>