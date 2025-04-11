
<template>
  <div class="register-container">
    <!-- 樱花装饰背景 -->
    <div class="sakura-decoration"></div>

    <!-- 表单主体 -->
    <div class="form-wrapper">
      <h2 class="form-title">🌸 用户注册 🌸</h2>
      <form @submit.prevent="handleSubmit" class="register-form">
        <!-- 用户名 -->
        <div class="form-group">
          <label for="username">用户名 <span class="required">*</span></label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            placeholder="请输入用户名"
            required
          />
          <span class="error-msg" v-if="errors.username">{{ errors.username }}</span>
        </div>

        <!-- 密码 -->
        <div class="form-group">
          <label for="password">密码 <span class="required">*</span></label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="请输入密码"
            required
          />
          <span class="error-msg" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <!-- 手机号 -->
        <div class="form-group">
          <label for="phone">手机号 <span class="optional">(可选)</span></label>
          <input
            type="tel"
            id="phone"
            v-model="formData.phone"
            placeholder="请输入手机号"
          />
        </div>

        <!-- 邮箱 -->
        <div class="form-group">
          <label for="email">邮箱 <span class="optional">(可选)</span></label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="请输入邮箱"
          />
        </div>

        <button type="submit" class="submit-btn">立即注册</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';
const loading=ref(false);
const errorMessage = ref('');
const formData = ref({
  username: '',
  password: '',
  phone: '',
  email: ''
});

const errors = ref({
  username: '',
  password: ''
});

const validateForm = () => {
  let isValid = true;
  errors.value = { username: '', password: '' };

  if (!formData.value.username.trim()) {
    errors.value.username = '用户名不能为空';
    isValid = false;
  }

  if (!formData.value.password) {
    errors.value.password = '密码不能为空';
    isValid = false;
  } else if (formData.value.password.length < 6) {
    errors.value.password = '密码至少需要6位';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
    if (validateForm()) {
      loading.value = true;
      try {
        // 发送请求到后端
        const response = await axios.post(
            'http://localhost:8000/api/register/',
            formData.value,
            {
              headers: {
                'content-type': 'application/json'
              }
        });
        console.log('提交成功:', response.data);
        errorMessage.value='返回首页后登录';
        setTimeout(()=>{
          router.push('/');
        },1500);
      } catch (error) {
        console.error('提交失败:', error.response?.data?.detail || error.message);
        errorMessage.value = `注册失败: ${error.response?.data?.detail || error.message}`;
      } finally {
        loading.value = false;
      }
    }
  };

</script>

<style scoped>
.register-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe6f0 0%, #ffcce0 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.sakura-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/b1.jpg') repeat;
  opacity: 0.1;
  pointer-events: none;
}

.form-wrapper {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem 3rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(255, 192, 203, 0.3);
  width: 100%;
  max-width: 450px;
  z-index: 1;
}

.form-title {
  color: #ff69b4;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  position: relative;
}

.form-group label {
  display: block;
  color: #ff69b4;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #ffb6c1;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #ff69b4;
  box-shadow: 0 0 5px rgba(255, 105, 180, 0.3);
}

.required {
  color: #ff4757;
  font-size: 0.8em;
}

.optional {
  color: #a0a0a0;
  font-size: 0.8em;
}

.error-msg {
  color: #ff4757;
  font-size: 0.8rem;
  position: absolute;
  bottom: -1.2rem;
  left: 0;
}

.submit-btn {
  background: linear-gradient(135deg, #ff69b4, #ff8eb3);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #ff3b8d, #ff759c);
  transform: translateY(-2px);
}
</style>