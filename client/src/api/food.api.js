import axios from './axios';

export const getMenuApi = () => axios.get('/foods/menu');

export const getFoodsApi = (params) => axios.get('/foods', { params });
