import { create } from 'zustand';
import { checkoutApi, getMyOrdersApi, getOrderByIdApi } from '../api/order.api';

export const useOrderStore = create((set) => ({
  orders: [],
  currentOrder: null,
  loading: false,

  checkout: async (data) => {
    try {
      set({ loading: true });
      const res = await checkoutApi(data);
      set({ currentOrder: res.data.data, loading: false });
      return res.data.data;
    } catch (err) {
      set({ loading: false });
      console.log(err);
    }
  },

  fetchOrders: async () => {
    try {
      set({ loading: true });
      const res = await getMyOrdersApi();
      set({ orders: res.data.data, loading: false });
    } catch (err) {
      set({ loading: false });
      console.log(err);
    }
  },

  trackOrder: async (id) => {
    try {
      set({ loading: true });
      const res = await getOrderByIdApi(id);
      set({ currentOrder: res.data.data, loading: false });
    } catch (err) {
      set({ loading: false });
      console.log(err);
    }
  },
}));
