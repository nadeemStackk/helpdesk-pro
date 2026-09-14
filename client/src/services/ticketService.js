import api from './api';

export const getTickets = async () => {
  const { data } = await api.get('/tickets');
  return data.tickets;
};

export const getTicketById = async (id) => {
  const { data } = await api.get(`/tickets/${id}`);
  return data; // { ticket, comments }
};

export const createTicket = async (ticketData) => {
  const { data } = await api.post('/tickets', ticketData);
  return data.ticket;
};

export const updateTicket = async (id, updates) => {
  const { data } = await api.put(`/tickets/${id}`, updates);
  return data.ticket;
};

export const deleteTicket = async (id) => {
  await api.delete(`/tickets/${id}`);
};

export const addComment = async (id, message) => {
  const { data } = await api.post(`/tickets/${id}/comments`, { message });
  return data.comment;
};