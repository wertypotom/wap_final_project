import React, { useEffect, useState } from 'react'
import { Modal, Form } from 'react-bootstrap'
import { Button } from '../ui'
import type { IReview, IReviewInput } from '../types'
import { addReview, updateReview } from '../services/reviewService'

interface ReviewModalProps {
  show: boolean
  onHide: () => void
  productId: string
  review?: IReview
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  show,
  onHide,
  productId,
  review,
}) => {
  const [author, setAuthor] = useState<string>('')
  const [rating, setRating] = useState<number>(5)
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    if (review) {
      setAuthor(review.author)
      setRating(review.rating)
      setComment(review.comment)
    } else {
      setAuthor('')
      setRating(5)
      setComment('')
    }
  }, [review, show])

  const handleSubmit = async () => {
    const payload: IReviewInput = { author, rating, comment }
    try {
      if (review) {
        await updateReview(productId, review.id, payload)
      } else {
        await addReview(productId, payload)
      }
      onHide()
    } catch (err) {
      console.error('Failed to submit review:', err)
    }
  }

  const isSubmitDisabled = author.trim() === '' || comment.trim() === ''

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{review ? 'Edit Review' : 'Add Review'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='reviewAuthor' className='mb-3'>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type='text'
              placeholder='Your name'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='reviewRating' className='mb-3'>
            <Form.Label>Rating</Form.Label>
            <Form.Select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} Star{n > 1 && 's'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId='reviewComment' className='mb-3'>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Write your review...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          {review ? 'Update Review' : 'Submit Review'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
