<template>
  <div class="modern-layout" style="display: flex; flex-direction: column; align-items: center">

    <div class="header-section">
      <h3 class="modern-title">📚 我的借阅记录（共 {{ total }} 册）</h3>
      <el-tag type="info" effect="dark">最长借阅期30天</el-tag>
    </div>

    <el-table
      :data="borrowRecords"
      style="width: 80%"
      max-width=1200px
      margin:0 auto
      :cell-style="{'text-align': 'center'}"
      stripe
      empty-text="暂无借阅记录"
    >
      <!-- 书名列 -->
      <el-table-column label="书名" width="200">
        <template #default="{row}">
          <div class="book-info">
            <span class="book-title">{{ row.book.title }}</span>

            <el-tag
              v-if="row.status !== '正常'"
              :type="row.status === '逾期' ? 'danger' : 'warning'"
              size="small"
            >
              {{ row.status }}
            </el-tag>
          </div>

        </template>
      </el-table-column>

      <!-- 应还日期列 -->
      <el-table-column label="应还日期" width="150">
        <template #default="{row}">
          <div class="date-cell" :class="{ 'expired-date': isExpired(row.due_date) }">
            {{ formatDate(row.due_date) }}
            <div class="remain-days">
              剩余 {{ calculateRemainDays(row.due_date) }} 天
            </div>
          </div>
        </template>
      </el-table-column>


      <el-table-column label="借阅进度" width="200">
        <template #default="{row}">
          <el-progress
            :percentage="calculateProgress(row.borrow_date, row.due_date)"
            color="#f56c6c"
            :show-text="false"
            :stroke-width="12"
          />

          <div class="progress-info">
            <span>{{ formatDate(row.borrow_date) }}</span>
            <span>{{ formatDate(row.due_date) }}</span>
          </div>
        </template>
      </el-table-column>


      <el-table-column label="操作" width="180">
        <template #default="{row}">
          <div class="action-buttons">
            <el-button
              size="small"
              type="primary"
              @click="handleReturn(row)"
              :disabled="row.status === '已归还'"
            >
              归还
            </el-button>

            <el-button
              size="small"
              @click="handleRenew(row)"
              :disabled="row.renew_count >= 1 || isExpired(row.due_date)"
            >
              {{ row.renew_count > 0 ? '已续借' : '续借' }}
            </el-button>
          </div>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import {authService} from "@/services/api.js";

//响应式变量
const borrowRecords = ref([]);
const loading = ref(true);
const errorMessage = ref('');

//获取借阅记录
const getBorrowRecords = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    errorMessage.value = '请先登录';
    loading.value = false;
    return;
  }
  try {
    const response = await authService.borrowRecord( {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log(response);
    borrowRecords.value = response.map(record => ({
      ...record,
      renew_count: record.renew_count || 0,
      book_id: record.book.id,
      book_title: record.book.title
    }));

    loading.value = false;
  } catch (error) {
    const serverMessage = error.response?.data?.detail || error.message;
    errorMessage.value = `获取借阅记录失败: ${serverMessage}`;
    loading.value = false;
  }
};

onMounted(() => {
  getBorrowRecords();
});

const handleReturn =async (row) => {
  try{
    const token = localStorage.getItem('token');
    if (!token) {
      errorMessage.value = '请先登录';
      return;
    }
    console.log(row);
    await authService.returnBook(row.book_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    row.status = '已归还';
    row.return_date = new Date().toLocaleString();
    await getBorrowRecords();
  }

  catch (error) {
    const serverMessage = error.response?.data?.detail || error.message;
    errorMessage.value = `归还失败: ${serverMessage}`;
  }
};

const handleRenew = async (row) =>{
  try{
    const token=localStorage.getItem('token');
    if(!token){
      errorMessage.value='请先登录';
      return;
    }
    console.log(row);
    await authService.renewBook({ bookId: row.book_id },{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });
    await getBorrowRecords();
  }catch(error){
    const serverMessage=error.response?.data?.detail || error.message;
    errorMessage.value=`续借失败: ${serverMessage}`;
  }
};

const calculateProgress = (start, end) => {
  const total = new Date(end) - new Date(start)
  const passed = Date.now() - new Date(start)
  return Math.min(Math.round((passed / total) * 100), 100)
}

const calculateRemainDays = (dueDate) => {
  const remainDays = Math.ceil((new Date(dueDate) - Date.now()) / (1000 * 3600 * 24))
  return remainDays > 0 ? remainDays:'已逾期'
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

const isExpired = (dueDate) => {
  return new Date(dueDate) < Date.now()
}
const total = computed(() => borrowRecords.value.length)
</script>

<style scoped>

.modern-layout {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  max-width: 1200px;
  margin: 0 auto;
  transition: width 0.3s;
}

.header-section {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  color: #f8c8d8; /* 淡粉色 */
}

.book-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.book-title {
  font-weight: 500;
  color: #f67280; /* 粉色 */
}

.date-cell {
  color: #ff7f7f; /* 柔和的粉红色 */
  &.expired-date {
    color: #f56c6c; /* 强调过期日期的红色 */
    font-weight: bold;
  }
}

.remain-days {
  font-size: 12px;
  color: #ffb3b3; /* 浅粉色 */
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #e4a9c0; /* 暖粉色 */
  margin-top: 6px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  color: #f8c8d8; /* 淡粉色 */
}

@media (max-width: 768px) {
  .modern-layout {
    width: 95% !important;
    padding: 10px;
  }
}

</style>