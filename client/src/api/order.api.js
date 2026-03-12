import axios from './axios';

export const checkoutApi = (data) => axios.post('/orders/checkout', data);

export const getMyOrdersApi = () => axios.get('/orders/my');

export const getOrderByIdApi = (id) => axios.get(`/orders/${id}`);
