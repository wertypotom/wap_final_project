import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Button } from '../ui'
import type { IReview } from '../types'

interface Props extends IReview {
  onEdit: () => void
  onDelete: () => void
}

const ReviewItem: React.FC<Props> = ({
  author,
  rating,
  comment,
  sentiment,
  onEdit,
  onDelete,
}) => (
  <ListGroup.Item className='d-flex justify-content-between'>
    <div>
      <strong>{author}</strong> — {rating} stars
      <br />
      <em>{sentiment}</em>
      <p>{comment}</p>
    </div>
    <div className='btn-group'>
      <Button variant='outline-primary' size='sm' onClick={onEdit}>
        ✏️
      </Button>
      <Button variant='outline-danger' size='sm' onClick={onDelete}>
        🗑️
      </Button>
    </div>
  </ListGroup.Item>
)

export default ReviewItem
