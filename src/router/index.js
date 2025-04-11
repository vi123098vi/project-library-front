import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import MainPage from "@/views/MainPage.vue";
import BookList from "@/views/BookList.vue";
import UserProfileLayout from "@/views/UserProfileLayout.vue";
import BorrowAll from "@/views/BorrowAll.vue";
import CurrentBorrow from "@/views/CurrentBorrow.vue";
import UserInfo from "@/views/UserInfo.vue";
import Settings from "@/views/Settings.vue";
import store from "@/store/index.js";
import RegisterPage from "@/views/RegisterPage.vue";
import ReviewPage from "@/views/ReviewPage.vue";
import RecordManagementPage from "@/views/RecordManagementPage.vue";
import StatisticsPage from "@/views/StatisticsPage.vue";
//状态管理

//路由配置=路径+名字导航+组件
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path:'/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path:'/review',
    name:'Review',
    component: ReviewPage
  },
  {
    path:'/records',
    name:'Records',
    component: RecordManagementPage
  },
  {
    path:'/statistics',
    name:'Statistics',
    component: StatisticsPage
  },
  {
    path: '/main-page',
    name: 'MainPage',
    component: MainPage,
    meta: { requiresAuth: true }//需要登录才可访问
  },
  {
    path: '/book-list',
    name: 'BookList',
    component: BookList,
    meta: { requiresAuth: true }//需要登录才可访问
  },
  {
    path:'/user-profile',
    name: 'UserCenter',
    component: UserProfileLayout,
    meta: { requiresAuth: true },
    children:[
    { path: 'borrow-all',
      name: 'borrowAll',
      component: BorrowAll },

    { path: 'current-borrow',
      name: 'currentBorrow',
      component: CurrentBorrow},

    { path: 'userinfo',
      name: 'userinfo',
      component: UserInfo },

    { path: 'settings',
      name: 'settings',
      component: Settings }
    ]
  }
];

//创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

//路由守卫
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.state.token;

  console.log(`[路由守卫] 目标：${to.name}，认证状态：${isAuthenticated}`);

  // 已认证用户禁止访问登录页
  if (to.name === 'Login' && isAuthenticated) {
    console.warn('[路由拦截] 已登录用户访问登录页');
    return next({ name: 'MainPage' });
  }

  // 需要认证的路由处理
  if (requiresAuth) {
    if (!isAuthenticated) {
      console.warn(`[路由拦截] 未认证访问受保护路由：${to.name}`);
      return next({
        name: 'Login',
        query: {
          redirect: to.fullPath,
          reason: 'requires_auth'
        }
      });
    }

    // 附加角色验证（可选）
    if (to.meta.roles && !to.meta.roles.includes(store.getters.currentUser.role)) {
      console.warn(`[角色验证失败] 用户角色：${store.getters.currentUser.role}`);
      return next({
        name: 'ErrorPage',
        query: { code: 403 }
      });
    }
  }




  next();
});
export default router;