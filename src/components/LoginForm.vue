<template>
    <form class="login-form" @submit.prevent="handleSubmit">

    <div class="form-group">
      <label for="username">
        <i class="icon icon-user"></i>
        <input
          type="text"
          id="username"
          :value="form.username"
          @input="updateForm('username', $event.target.value)"
          placeholder="用户名"
          required
        />
      </label>
    </div>

    <div class="form-group">
      <label for="password">
        <i class="icon icon-lock"></i>
        <input
          type="password"
          id="password"
          :value="form.password"
          @input="updateForm('password', $event.target.value)"
          placeholder="密码"
          required
        />
      </label>
    </div>

    <div class="form-group">
      <label for="role">
        <i class="icon icon-role"></i>
        <input
          type="text"
          id="role"
          :value="form.role"
          readonly
        />
      </label>
    </div>

    <button type="submit" class="login-btn" :disabled="loading">
      <transition name="fade" mode="out-in">
        <span v-if="!loading" key="text">立即登录</span>
        <span v-else key="loader" class="dot-loader">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </span>
      </transition>
    </button>
    </form>

    <div v-if="errorMessage" class="error-msg">
      {{ errorMessage }}
    </div>
</template>

<script>
export default {
  props: {
    form: Object,
    loading: Boolean,
    errorMessage: String,
  },
  emits: ['submit', 'update:form'],
  methods: {
    handleSubmit() {
      this.$emit('submit');
    },
    updateForm(field, value) {
      this.$emit('update:form', {
        ...this.form,
        [field]: value
      });
    },
  },
};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(255, 182, 193, 0.2);
  position: relative;
  overflow: hidden;
}

/* 添加樱花花瓣装饰背景 */
.login-form::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -30%;
  width: 160%;
  height: 200%;
  background: url('@/assets/images/b1.jpg') repeat;
  opacity: 0.1;
  z-index: 0;
}

.form-group {
  position: relative;
  z-index: 1;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

input {
  width: 100%;
  padding: 1rem 1.25rem;
  padding-left: 3rem;
  font-size: 1rem;
  border: 2px solid #ffb7d2;
  border-radius: 0.75rem;
  background: rgba(255, 251, 253, 0.9);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Microsoft YaHei', sans-serif;
}

input:focus {
  border-color: #ff85b3;
  box-shadow: 0 0 12px rgba(255, 133, 179, 0.25);
  background: white;
}

/* 樱花图标设计 */
.icon {
  position: absolute;
  left: 1rem;
  font-size: 1.25rem;
  color: #ff72a0;
  transition: transform 0.3s ease;
}

input:focus ~ .icon {
  transform: scale(1.1) rotate(15deg);
  color: #ff3d7f;
}

.login-btn {
  background: linear-gradient(135deg, #ff85b3, #ffa1c8);
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-weight: 500;
  letter-spacing: 1px;
}

.login-btn:hover {
  background: linear-gradient(135deg, #ff6fa8, #ff8dbd);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 143, 189, 0.4);
}

.login-btn:active {
  transform: translateY(0);
}

/* 加载动画优化 */
.dot-loader {
  display: inline-flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: sakuraBounce 0.8s infinite ease-in-out;
}

@keyframes sakuraBounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
}

.error-msg {
  color: #ff4d6d;
  background: #fff0f3;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #ffccd5;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.error-msg::before {
  content: "❗";
  font-size: 1.1rem;
}
</style>