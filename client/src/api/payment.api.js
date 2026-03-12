import axios from './axios';

export const getPaymentIntentApi = (orderId) =>
  axios.get(`/payments/intent/${orderId}`);

export const verifyPaymentApi = (orderId, data) =>
  axios.post(`/payments/verify/${orderId}`, data);
