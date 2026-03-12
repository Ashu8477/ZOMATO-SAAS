import axios from './axios';

export const applyCouponApi = (data) => axios.post('/coupons/apply', data);
