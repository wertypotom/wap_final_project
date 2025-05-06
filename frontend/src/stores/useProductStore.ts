import create from 'zustand'
import { type IProduct } from '../types'
import { fetchProducts } from '../services/productService'

interface ProductStoreState {
  products: IProduct[]
  loading: boolean
  page: number
  category: string
  query: string
  setPage: (page: number) => void
  setCategory: (category: string) => void
  setQuery: (query: string) => void
  loadProducts: () => Promise<void>
}

export const useProductStore = create<ProductStoreState>((set, get) => ({
  products: [],
  loading: false,
  page: 1,
  category: '',
  query: '',
  setPage: (page) => set({ page }),
  setCategory: (category) => set({ category, page: 1 }),
  setQuery: (query) => set({ query, page: 1 }),
  loadProducts: async () => {
    set({ loading: true })
    try {
      const { page, category, query } = get()
      const products = await fetchProducts(page, category, query)
      set({ products })
    } finally {
      set({ loading: false })
    }
  },
}))
