import { create } from 'zustand';
import { getCartApi, addToCartApi, updateCartApi } from '../api/cart.api';

export const useCartStore = create((set) => ({
  items: [],
  totalAmount: 0,
  loading: false,

  fetchCart: async () => {
    try {
      set({ loading: true });
      const res = await getCartApi();
      set({
        items: res.data.data.items,
        totalAmount: res.data.data.totalAmount,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
      console.log(err);
    }
  },

  addItem: async (data) => {
    try {
      await addToCartApi(data);
      const res = await getCartApi();
      set({
        items: res.data.data.items,
        totalAmount: res.data.data.totalAmount,
      });
    } catch (err) {
      console.log(err);
    }
  },

  updateItem: async (data) => {
    try {
      await updateCartApi(data);
      const res = await getCartApi();
      set({
        items: res.data.data.items,
        totalAmount: res.data.data.totalAmount,
      });
    } catch (err) {
      console.log(err);
    }
  },
}));
