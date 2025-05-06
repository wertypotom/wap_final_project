import create from 'zustand'
import { type IProduct, type IReview } from '../types'
import { fetchProductById } from '../services/productService'
import { fetchReviews } from '../services/reviewService'

interface ProductDetailState {
  product: IProduct | null
  reviews: IReview[]
  loadingProduct: boolean
  loadingReviews: boolean
  loadProduct: (id: string) => Promise<void>
  loadReviews: (id: string) => Promise<void>
}

export const useProductDetailStore = create<ProductDetailState>((set) => ({
  product: null,
  reviews: [],
  loadingProduct: false,
  loadingReviews: false,
  loadProduct: async (id) => {
    set({ loadingProduct: true })
    try {
      const product = await fetchProductById(id)
      set({ product })
    } finally {
      set({ loadingProduct: false })
    }
  },
  loadReviews: async (id) => {
    set({ loadingReviews: true })
    try {
      const reviews = await fetchReviews(id)
      set({ reviews })
    } finally {
      set({ loadingReviews: false })
    }
  },
}))
