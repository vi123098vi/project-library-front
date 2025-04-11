<template>
  <div class="layout-container">
    <AdminNavbar />
    <div class="main-content">
      <router-view />
      <div class="borrow-records">
        <el-table :data="records" style="width: 100%">
          <el-table-column prop="user_name" label="借阅用户" width="120"/>
          <el-table-column prop="book_title" label="书名" width="180"/>
          <el-table-column prop="borrow_date" label="借阅日期" />
          <el-table-column prop="due_date" label="应还日期" />
          <el-table-column prop="return_date" label="归还日期" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="statusTagType(scope.row.status)">
                {{ formatStatus(scope.row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="renew_count" label="续借次数" />

          <el-table-column label="操作" width="200">
            <template #default="scope">
              <div class="action-buttons">
                <el-button
                  size="small"
                  type="primary"
                  @click="approved(scope.row)"
                  :disabled="scope.row.status === '已处理'"
                  >
                  通过
                  </el-button>


                <el-button
                size="small"
                type="primary"
                @click="rejected(scope.row)"
                :disabled="scope.row.status === '已拒绝'"
                >
                  拒绝
                  </el-button>
              </div>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from "vue-router";
import {dayjs} from "element-plus";


export default {
  components: { AdminNavbar },
  setup() {
    const records = ref([])
    const router=useRouter();

    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }
      try {
        const res = await axios.get('http://localhost:8000/api/borrow', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        records.value = res.data.map(record=>{
          record.id=records.id;
          record.borrow_date = dayjs(record.borrow_date).format('YYYY-MM-DD HH:mm:ss');
          record.due_date= dayjs(record.due_date).format('YYYY-MM-DD HH:mm:ss');
          record.return_date= dayjs(record.return_date).format('YYYY-MM-DD HH:mm:ss');
          return record;
        });
      } catch (error) {
        console.error('数据获取失败:', error)
        if (error.response.status === 401) {
          localStorage.removeItem('token')
          router.push('/login')
        }
      }
    }

    const approved = async (records) =>{
      const token=localStorage.getItem('token')
      if(!token){
        router.push('/login')
        return
      }
      try{
        const res=await axios.post('https://localhost:8000/borrow',records,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(res.data);
      }catch(error){
        console.error(error);
      }
    }

    const formatStatus = (status) => {
      const mapping = {
        pending: '待审核',
        approved: '已通过',
        rejected: '已拒绝',
        returned: '已归还'
      }
      return mapping[status] || status
    }

    const statusTagType = (status) => {
      const typeMap = {
        pending: 'warning',
        approved: 'success',
        rejected: 'danger',
        returned: 'info'
      }
      return typeMap[status] || ''
    }

    onMounted(() => {
      fetchData()
    })

    return {
      records,
      formatStatus,
      statusTagType
    }
  }
}
</script>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
  margin-left: 200px;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #fff0f5;
  overflow-y: auto;
  transition: margin 0.3s ease;
}
.borrow-records {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(255,182,193,0.2);
  font-family: "宋体", SimSun, serif;
}
</style>