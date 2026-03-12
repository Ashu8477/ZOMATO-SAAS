import axios from './axios';

export const getFoodsApi = () => axios.get('/foods');

export const createFoodApi = (data) =>
  axios.post('/foods', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateFoodApi = (id, data) => axios.put(`/foods/${id}`, data);

export const deleteFoodApi = (id) => axios.delete(`/foods/${id}`);
