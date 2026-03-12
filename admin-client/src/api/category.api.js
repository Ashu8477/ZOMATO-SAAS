import axios from './axios';

export const getCategoriesApi = () => axios.get('/categories');

export const createCategoryApi = (data) => axios.post('/categories', data);
