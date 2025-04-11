import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {authService} from "@/services/api.js";
import router from '@/router'

export default createStore({
  plugins: [createPersistedState({ paths: ['token', 'user'] })],

  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    authError: null
  },

  mutations: {
    setToken(state, token) {
      console.log('setToken:', token);
      state.token = token
    },
    setUser(state, user) {
      console.log('setUser:', user);
      state.user = user
    },
    clearAuth(state) {
      state.token = ''
      state.user = null
      localStorage.removeItem('token')
    },
    setAuthError(state, error) {
      state.authError = error
    }
  },

  actions: {
    async initializeAuth({ commit,dispatch,state }) {
      try {
        const token = state.token;
        if (!token) return;

        const isValid = await dispatch('validateToken', token);
        if (isValid) {
          const user = await dispatch('fetchUser');
          commit('setToken', token);
          commit('setUser', user);
          } else {
          dispatch('logout');
        }
      } catch (error) {
        console.error(error);
        commit('setAuthError', '会话已过期，请重新登录');
        dispatch('logout');
      }
      },

    async validateToken({ commit }, token) {
    try {
      const response = await authService.validtoken(token);
      return response.data.isValid;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
    logout({ commit }) {
      commit('clearAuth');
      router.push('/login').catch(err =>
      console.log('路由跳转失败:', err)
    );
  },

    async login({ commit }, credentials) {
      try {
      const data = await authService.login(credentials);
      console.log('login:', data);
      const {
        access_token,
        user
      } = data;
      localStorage.setItem('token', access_token);
      console.log('token:', access_token);
      commit('setToken', access_token);
      commit('setUser', user);
      commit('setAuthError', null);
      return {user};

    } catch (error) {
    const serverMessage = error.response?.data?.detail
      || error.response?.data?.message
      || error.message
      || '登录失败，请检查凭证';

    commit('setAuthError', serverMessage);
    throw new Error(serverMessage); // 保持错误冒泡
  }
},

  },

  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
    userRole: state => state.user?.role || 'guest',
    authError: state => state.authError
  }
})