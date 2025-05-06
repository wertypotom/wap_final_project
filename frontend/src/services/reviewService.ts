import { api } from './api'
import { type IReview, type IReviewInput } from '../types'

export async function fetchReviews(productId: string): Promise<IReview[]> {
  const response = await api.get<IReview[]>(`/products/${productId}/reviews`)
  return response.data
}

export async function addReview(
  productId: string,
  data: IReviewInput
): Promise<IReview> {
  const response = await api.post<IReview>(
    `/products/${productId}/reviews`,
    data
  )
  return response.data
}

export async function updateReview(
  productId: string,
  reviewId: string,
  data: IReviewInput
): Promise<IReview> {
  const response = await api.put<IReview>(
    `/products/${productId}/reviews/${reviewId}`,
    data
  )
  return response.data
}

export async function deleteReview(
  productId: string,
  reviewId: string
): Promise<void> {
  await api.delete(`/products/${productId}/reviews/${reviewId}`)
}
