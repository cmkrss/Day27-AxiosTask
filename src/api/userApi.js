import axios from 'axios';


const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getUsers = () => api.get('/');
export const getUser = (id) => api.get(`/${id}`);
export const createUser = (user) => api.post('/', user);
export const updateUser = (id, user) => api.put(`/${id}`, user);
export const deleteUser = (id) => api.delete(`/${id}`);
