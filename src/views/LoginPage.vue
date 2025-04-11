<template>
  <div class="login-container">
    <div class="sakura-petal petal-1"></div>
    <div class="sakura-petal petal-2"></div>
    <div class="sakura-petal petal-3"></div>

    <div class="form-wrapper">
      <h1 class="form-title">
        <span class="sakura-icon">🌸</span>
        欢迎登录 Library-Pro
        <span class="sakura-icon">📖</span>
      </h1>
      <LoginForm
        :form="form"
        :loading="loading"
        :errorMessage="errorMessage"
        @submit="handleSubmit"
        @update:form="form= $event"
      />
    </div>
  </div>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        role: ''
      },
      loading: false,
      errorMessage: ''
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.validateForm()) return;
      this.loading = true;
      this.errorMessage = '';
      try {
        const loginData = await this.$store.dispatch('login', {
          username: this.form.username,
          password: this.form.password
      });
        console.log('登录响应数据:', loginData);

        const { user } = loginData;
        console.log('用户信息:', user);

      const targetRoute= user.role === 'admin'
        ? '/review'
          :'/main-page';
      this.$router.push(targetRoute);
    } catch (error) {
      this.errorMessage = error.message || this.$store.getters.authError;
    } finally {
      this.loading = false;
    }
  },
    validateForm() {
      if (!this.form.username || !this.form.password) {
        this.errorMessage = '请填写完整信息';
        return false;
      }
      return true;
    }
  }
}
</script>



<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #fff0f5, #fff9fb);
  position: relative;
  overflow: hidden;
}

/* 动态樱花花瓣 */
.sakura-petal {
  position: absolute;
  background: url('@/assets/images/b1.jpg') no-repeat;
  background-size: contain;
  opacity: 0.3;
  animation: float 12s infinite linear;
}

.petal-1 {
  width: 40px; height: 40px;
  top: 10%; left: 5%;
  animation-delay: 0s;
}

.petal-2 {
  width: 30px; height: 30px;
  top: 30%; right: 8%;
  animation-delay: 3s;
}

.petal-3 {
  width: 25px; height: 25px;
  bottom: 15%; left: 20%;
  animation-delay: 6s;
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-100px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
}

.form-wrapper {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2.5rem;
  width: 440px;
  box-shadow: 0 8px 32px rgba(255, 182, 193, 0.2);
  position: relative;
  z-index: 1;
}

.form-title {
  color: #ff6b8d;
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
}

.sakura-icon {
  font-size: 1.5em;
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
