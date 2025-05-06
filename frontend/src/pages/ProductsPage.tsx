import { useState, type FC } from 'react'
import Container from 'react-bootstrap/Container'
import { ProductList } from '../widgets/ProductList'
import { Button } from '../ui'
import { ProductModal } from '../widgets/ProductModal'

export const ProductsPage: FC = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Container className='my-4'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1>Products</h1>
        <Button onClick={() => setShowModal(true)}>Add Product</Button>
      </div>
      <ProductList />
      <ProductModal show={showModal} onHide={() => setShowModal(false)} />
    </Container>
  )
}
