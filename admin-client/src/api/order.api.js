import axios from './axios';

export const getAllOrdersApi = () => axios.get('/orders');

export const updateOrderStatusApi = (id, status) =>
  axios.patch(`/orders/${id}/status`, { status });
