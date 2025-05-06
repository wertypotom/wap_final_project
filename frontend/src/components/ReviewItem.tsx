import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Button } from '../ui'
import type { IReview } from '../types'

interface ReviewItemProps extends IReview {
  onEdit: () => void
}

export const ReviewItem: React.FC<ReviewItemProps> = ({
  author,
  rating,
  comment,
  sentiment,
  onEdit,
}) => (
  <ListGroup.Item className='d-flex justify-content-between'>
    <div>
      <strong>{author}</strong> — {rating} stars
      <br />
      <em>{sentiment}</em>
      <p>{comment}</p>
    </div>
    <Button variant='outline-primary' size='sm' onClick={onEdit}>
      ✏️
    </Button>
  </ListGroup.Item>
)
