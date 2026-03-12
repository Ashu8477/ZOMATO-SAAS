import axios from './axios';

export const getCartApi = () => axios.get('/cart');

export const addToCartApi = (data) => axios.post('/cart/add', data);

export const updateCartApi = (data) => axios.put('/cart/update', data);
