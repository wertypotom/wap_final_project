export interface IProduct {
  id: string
  name: string
  description: string
  category: string
  price: number
  dateAdded: string
  averageRating: number
}

export interface IReview {
  id: string
  productId: string
  author: string
  rating: number
  comment: string
  sentiment: 'Positive' | 'Neutral' | 'Negative'
  isSpam: boolean
  date: string
}

export interface IReviewInput {
  author: string
  rating: number
  comment: string
}

export interface IProductInput {
  name: string
  description: string
  category: string
  price: number
}
