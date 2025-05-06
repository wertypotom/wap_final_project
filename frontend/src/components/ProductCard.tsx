import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router'
import type { IProduct } from '../types'

export const ProductCard: React.FC<IProduct> = ({
  id,
  name,
  description,
  price,
}) => (
  <Card className='mb-3'>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <Card.Subtitle className='mb-2 text-muted'>
        ${price.toFixed(2)}
      </Card.Subtitle>
      <Link to={`/products/${id}`}>View Details</Link>
    </Card.Body>
  </Card>
)
