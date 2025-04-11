<template>
  <div class="page-container">
    <Navigator />
    <main class="content-wrapper">
      <div class="book-list-container">

        <!-- 1. 头部区域 -->
        <div class="sakura-header">
          <h2 class="title">📖 樱花书馆 · 藏书阁</h2>
          <div class="search-box">
            <input
              v-model="searchQuery"
              placeholder="🌸 搜索你心仪的书籍..."
              class="search-input"
              @keyup.enter="handleSearch"
            />
            <i class="el-icon-search search-icon"></i>
          </div>
        </div>

        <!-- 2. 加载状态 -->
        <div v-if="loading" class="loading-container">
          <i class="el-icon-loading"></i>
          <span>樱花正在飘落，请稍候...</span>
        </div>

        <!-- 3. 空状态 -->
        <div v-else-if="!loading && filteredBooks.length === 0" class="empty-state">
          <img src="@/assets/images/loadingpic.jpg" class="empty-image" alt="樱花飘落的空书架" />
          <p>暂时没有找到相关的樱花藏书哦~</p>
        </div>

        <!-- 4. 图书网格布局 -->
        <div v-else class="book-grid">
          <BookCard
            v-for="book in filteredBooks"
            :key="book.id"
            :book="book"
            @view-details="handleViewDetails"
            @borrow-book="handleBorrowBook"
          />
        </div>

        <!-- 5. 图书详情弹窗 -->
        <BookDetailDialog
            v-if="selectedBook"
            :book="selectedBook"
            :visible="dialogVisible"
            @update:visible="val=>dialogVisible = val"
            @close-dialog="handleClose"
        />

        <Responselog
            v-if="errorMessage"
            :errorMessage="errorMessage"
            :visible="dialogVisible"
            @close-dialog="handleClose"
        />


      </div>
    </main>
  </div>
</template>


<script setup>

import { ref, computed, onMounted } from 'vue'
import {authService} from "@/services/api.js";
import Navigator from '@/components/Navigator.vue'
import BookCard from '@/components/BookCard.vue'
import BookDetailDialog from "@/components/BookDetailDialog.vue"
import Responselog from "@/components/Responselog.vue"

// ========== 响应式数据 ==========
const books = ref([])
const searchQuery = ref('')
const loading = ref(true)

const errorMessage = ref('')
const selectedBook = ref(null)
const dialogVisible = ref(false)

//加载图书数据
const fetchBooks = async () => {
  const token=localStorage.getItem('token');
  let response;
  try {
    if (!token) {
      errorMessage.value = '请先登录';
      return;
    }
    response = await authService.getBooks();
    console.log('图书数据', response);
    books.value = response;
  } catch (error) {
    console.error('获取图书数据失败:', error);
    console.log(response?.status);
    errorMessage.value = '加载图书失败，请稍后重试。';
  } finally {
    loading.value = false;
  }
};

 onMounted(fetchBooks)

// 筛选图书数据
const filteredBooks = computed(() => {
  const query = String(searchQuery.value).trim().toLowerCase()
  if (!query) return books.value
  return books.value.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  )
})

const handleViewDetails = (book) => {
  selectedBook.value = book
  dialogVisible.value = true
}

// 借阅书籍
const handleBorrowBook = async (book) => {
  const token = localStorage.getItem('token');
  if (!token) {
    errorMessage.value = '请先登录后借阅';
    return;
  }

  try {
    const response= await authService.borrowBooks({
      bookId: book.id,
    })
    if (response.status === 201) {
      console.log(response.data);
      book.status = '借出';
    }
  } catch (error) {
    console.error('借阅失败', error);
    errorMessage.value = '借阅失败，请稍后重试。';
  }
}


// 搜索
const handleSearch = () => {
  console.log('当前搜索关键词:', searchQuery.value)
}
const handleClose = () => {
  dialogVisible.value = false; // 更新状态关闭弹窗
};
</script>




<style lang="scss" scoped>
/* 页面容器 */
.page-container {
  padding-top: 60px; // 匹配导航栏高度
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff9fb, rgba(241, 202, 215, 0.94));
}

/* 主内容区 */
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.book-list-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;
}

/* 头部样式 */
.sakura-header {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    color: #d04a6c;
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(208, 74, 108, 0.1);
  }
}

/* 搜索框样式 */
.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto;

  .search-input {
    width: 100%;
    padding: 12px 45px 12px 20px;
    border: 2px solid #ffb3c6;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    transition: all 0.3s;

    &:focus {
      outline: none;
      box-shadow: 0 0 10px rgba(255, 179, 198, 0.3);
      border-color: #ff758f;
    }
  }

  .search-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #ff758f;
    font-size: 1.2rem;
  }
}

/* 图书网格布局 */
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 20px 0;
}

/* 加载状态 */
.loading-container {
  text-align: center;
  padding: 2rem;
  color: #ff758f;

  i {
    font-size: 2rem;
    margin-bottom: 1rem;
    animation: spin 1s linear infinite;
  }
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 3rem;

  .empty-image {
    width: 200px;
    opacity: 0.8;
    margin-bottom: 1rem;
  }

  p {
    color: #d04a6c;
    font-size: 1.1rem;
  }
}

/* 动画 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>