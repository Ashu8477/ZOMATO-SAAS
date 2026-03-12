import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),

  login: (data) => {
    localStorage.setItem('token', data.accessToken);
    set({ user: data.user, token: data.accessToken });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
