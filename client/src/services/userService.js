import api from './api';

export const getAllUsers = async () => {
  const { data } = await api.get('/users');
  return data.users;
};

export const updateUser = async (id, updates) => {
  const { data } = await api.patch(`/users/${id}`, updates);
  return data.user;
};