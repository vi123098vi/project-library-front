<template>
  <div class="home-container">
    <!-- 标题部分 -->
    <h1 class="welcome-title">⭐WELCOME TO Library-Pro📖</h1>

    <!-- 跑马灯部分 -->
    <div class="marquee-container">
      <div class="marquee-wrapper">
      <div class="marquee-content">
        🌸📚 New Arrivals | ✨ Best Sellers | 🎉 Special Collections | 🏆 Award Winners | 💡 Featured Books 🌸
      </div>
        <div class="marquee-content" aria-hidden="true">
          🌸📚 New Arrivals | ✨ Best Sellers | 🎉 Special Collections | 🏆 Award Winners | 💡 Featured Books 🌸
        </div>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="button-group">
      <button class="action-btn" @click="navigateToRegister">🎀注册🎀</button>
      <button class="action-btn" @click="navigateToLogin">🎀登录🎀</button>
    </div>

  </div>
</template>


<script>
export default {
  methods: {
    navigateToRegister() {
      // 跳转注册页面逻辑
      this.$router.push('/register')
    },
    navigateToLogin() {
      // 跳转登录页面逻辑
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Noto+Serif+SC:wght@200..900&display=swap');
.home-container {
  height: 100vh;
  background: linear-gradient(45deg, #ffa1d2 50%, #ff95b7 100%);
  display: flex;
  flex-direction: column;
  position: relative;
}

.welcome-title {
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  font-family: "Anton", sans-serif;
  font-size: 7vw;
  text-shadow:
     2px 2px 0 rgba(0,0,0,0.1),
     4px 4px 0  rgba(255,255,255,0.2);
  margin: 0;
}

.marquee-container {
  height: 15vh;
  overflow: hidden;
  position: relative;
  background: linear-gradient(45deg, #ffa1d2 50%, #ff95b7 100%);
  margin-bottom: 30px; /* 增加底部间距 */
}

.marquee-wrapper {
  display: flex;
  width: 200%; /* 双倍宽度容纳复制内容 */
}

.marquee-content {
  flex: 0 0 50%;
  white-space: nowrap;
  animation: marquee 20s linear infinite;
  color: white;
  font-size: 1.2rem;
  padding: 10px 0;
}

@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.button-group {
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 50px;
}

.action-btn {
  font-family: "Bebas Neue", sans-serif;
  background: #f7ff00;
  color: #333;
  border: none;
  padding: 15px 40px;
  border-radius: 30px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
}

.action-btn:hover {
  font-family: "Bebas Neue", sans-serif;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  background: #f7ff00;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 2rem;
    text-align: center;
    padding: 0 15px;
  }

  .action-btn {
    width: 180px;
    padding: 12px 30px;
  }
}
</style>