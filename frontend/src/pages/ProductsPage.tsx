import React from 'react'
import Container from 'react-bootstrap/Container'
import { ProductList } from '../widgets/ProductList'

export const ProductsPage: React.FC = () => {
  return (
    <Container className='my-4'>
      <h1>Products</h1>
      <ProductList />
    </Container>
  )
}
