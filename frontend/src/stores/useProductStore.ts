import { create } from 'zustand';
import type { IProduct } from '../types';
import { fetchProducts } from '../services/productService';

interface ProductStoreState {
  products: IProduct[];
  loading: boolean;
  page: number;
  category: string;
  query: string;
  setPage: (p: number) => void;
  setCategory: (c: string) => void;
  setQuery: (q: string) => void;
  loadProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStoreState>((set, get) => ({
  products: [],
  loading: false,
  page: 1,
  category: '',
  query: '',
  setPage: (page) => set({ page }),
  setCategory: (category) => set({ category }),
  setQuery: (query) => set({ query }),
  loadProducts: async () => {
    set({ loading: true });
    try {
      const { page, category, query } = get();
      const data = await fetchProducts(page, category, query);
      set({ products: data });
    } finally {
      set({ loading: false });
    }
  },
}));
