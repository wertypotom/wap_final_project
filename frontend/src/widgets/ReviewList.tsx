import React, { useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Spinner, Button } from '../ui'
import { ReviewItem } from '../components/ReviewItem'
import { ReviewModal } from './ReviewModal'
import type { IReview } from '../types'

interface ReviewListProps {
  productId: string
  reviews: IReview[]
  loading: boolean
  refetch: () => void
}

export const ReviewList: React.FC<ReviewListProps> = ({
  productId,
  reviews,
  loading,
  refetch,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [editingReview, setEditingReview] = useState<IReview | null>(null)

  return (
    <>
      <Button onClick={() => setShowModal(true)} className='mb-3'>
        Add Review
      </Button>

      {loading ? (
        <Spinner />
      ) : (
        <ListGroup>
          {reviews.map((r) => (
            <ReviewItem
              key={r.id}
              {...r}
              onEdit={() => {
                setEditingReview(r)
                setShowModal(true)
              }}
            />
          ))}
        </ListGroup>
      )}

      <ReviewModal
        show={showModal}
        review={editingReview ?? undefined}
        productId={productId}
        onHide={() => {
          setShowModal(false)
          setEditingReview(null)
          refetch()
        }}
      />
    </>
  )
}
