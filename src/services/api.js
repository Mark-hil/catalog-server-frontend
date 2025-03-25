import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User Authentication
export const login = (credentials) => api.post('/login', credentials);
export const signup = (userData) => api.post('/signup', userData);

// Product Endpoints
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const searchProducts = (query, page = 1, perPage = 10) =>
  api.get(`/search?q=${query}&page=${page}&per_page=${perPage}`);

// Add Product
export const addProduct = (productData) => api.post('/products', productData);