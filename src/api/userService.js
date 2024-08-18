import axios from './axios';

export const getUsers = () => axios.get('/users');
export const getUserById = (id) => axios.get(`/users/${id}`);
export const createUser = (user) => axios.post('/users', user);
export const updateUser = (id, user) => axios.put(`/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`/users/${id}`);
