import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Container from 'react-bootstrap/Container'
import { Spinner } from '../ui'
import { ReviewList } from '../widgets/ReviewList'
import { useProductDetailStore } from '../stores/useProductDetailStore'

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const {
    product,
    reviews,
    loadingProduct,
    loadingReviews,
    loadProduct,
    loadReviews,
  } = useProductDetailStore()

  useEffect(() => {
    if (id) {
      loadProduct(id)
      loadReviews(id)
    }
  }, [id, loadProduct, loadReviews])

  if (loadingProduct || !product) {
    return <Spinner />
  }

  return (
    <Container className='my-4'>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>
      <p>
        <strong>Average Rating:</strong> {product.averageRating.toFixed(1)}
      </p>
      <hr />
      <h2>Reviews</h2>
      <ReviewList
        productId={product.id}
        reviews={reviews}
        loading={loadingReviews}
        refetch={() => id && loadReviews(id)}
      />
    </Container>
  )
}
