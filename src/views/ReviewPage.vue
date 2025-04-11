<template>
  <div class="layout-container">
    <AdminNavbar />
    <div class="main-content">
      <router-view />
      <div class="review-log-table">
        <el-table :data="reviewLogs" style="width: 100%">
          <el-table-column prop="admin" label="操作管理员" width="120"/>
          <el-table-column prop="affected_user" label="被操作用户" width="120"/>
          <el-table-column prop="borrow_record" label="借阅记录" width="180"/>
          <el-table-column label="通过/拒绝">
            <template #default="scope">
              <el-tag v-if="scope.row.action === 'approve'" type="success">
                通过
              </el-tag>
              <el-tag v-if="scope.row.action === 'reject'" type="danger">
                拒绝
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="禁用/启用">
            <template #default="scope">
              <el-tag v-if="scope.row.action === 'enable_user'" type="success">
                启用
              </el-tag>
              <el-tag v-if="scope.row.action === 'disable_user'" type="danger">
                禁用
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="审核意见"/>
          <el-table-column prop="timestamp" label="操作时间" width="180"/>
        </el-table>
      </div>
    </div>
  </div>
</template>


<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import {useRoute} from "vue-router";

export default {
  components: { AdminNavbar },
  setup() {
    const token=localStorage.getItem('token')
    const router=useRoute()
    if(!token){
      router.push('/login')
    }

    const reviewLogs = ref([])

    const fetchReviewLogs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/review',{
          headers:{
            'Authorization':`Bearer ${token}`,
          },
        })
        reviewLogs.value = res.data
      } catch (error) {
        console.error('数据获取失败:', error)
      }
    }

    onMounted(() => {
      fetchReviewLogs()
    })

    return {
      reviewLogs
    }
  }
}
</script>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
  margin-left: 200px;
  background-color: #f7f7f7; /* 背景颜色 */
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #ffffff; /* 白色背景 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 轻微阴影效果 */
  overflow-y: auto;
  transition: margin 0.3s ease;
}

.el-table th, .el-table td {
  text-align: center; /* 表格文本居中 */
  padding: 12px;
  font-size: 14px; /* 更适合阅读的字体大小 */
  color: #333; /* 深灰色文本 */
}

.el-table th {
  background-color: #f1f1f1; /* 表头背景色 */
  color: #555; /* 表头文本色 */
  font-weight: bold;
}

.el-table td {
  background-color: #ffffff; /* 表格单元格背景 */
  border: 1px solid #e0e0e0; /* 单元格边框 */
}



@media (max-width: 768px) {
  .layout-container {
    margin-left: 0;
  }

  .main-content {
    padding: 10px;
  }
}
</style>
