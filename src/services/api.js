import axios from "axios";

const api =axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    timeout: 5000,
    withCredentials: true,
})


// 统一错误处理拦截器
api.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 统一响应拦截
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject({
      response: {
        data: error.response?.data,
        status: error.response?.status
      }
    });
  }
);


api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    const refreshToken = localStorage.getItem('refresh_token')
    const { data } = await api.post('token/refresh/', { refresh: refreshToken })
    localStorage.setItem('token', data.access)
    return api(originalRequest)
  }
  return Promise.reject(error)
})

export const authService = {
  login: (credentials) => api.post('auth/token/', credentials),
    getBooks: () => api.get('book-list/'),
        validtoken: (token) => api.post('auth/token/verify/', {token}),
    borrowBooks: (credentials) => {
        return api.post('borrow_book/', credentials)
    },
        borrowRecord:()=> api.get('borrow_record/'),
    returnBook: (bookId, config) => api.post('returnbook/', { bookId }, config),
    renewBook:(bookId,config)=>api.post('renewbook/',{bookId},config),
}
