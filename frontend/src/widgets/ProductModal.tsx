import React, { useEffect, useState } from 'react'
import { Modal, Form } from 'react-bootstrap'
import { Button } from '../ui'
import type { IProductInput } from '../types'
import { createProduct } from '../services/productService'
import { useToastStore } from '../stores/useToastStore'
import { useProductStore } from '../stores/useProductStore'

interface Props {
  show: boolean
  onHide: () => void
}

export const ProductModal: React.FC<Props> = ({ show, onHide }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState<number>(0)
  const addToast = useToastStore((s) => s.addToast)
  const loadProducts = useProductStore((s) => s.loadProducts)

  useEffect(() => {
    if (!show) {
      setName('')
      setDescription('')
      setCategory('')
      setPrice(0)
    }
  }, [show])

  const handleSubmit = async () => {
    const payload: IProductInput = { name, description, category, price }
    try {
      await createProduct(payload)
      addToast('Product added', 'success')
      loadProducts()
      onHide()
    } catch {
      addToast('Failed to add product', 'danger')
    }
  }

  const invalid =
    !name.trim() || !description.trim() || !category.trim() || price <= 0

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/** Name **/}
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!name.trim()}
            />
          </Form.Group>
          {/** Description **/}
          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={!description.trim()}
            />
          </Form.Group>
          {/** Category **/}
          <Form.Group className='mb-3'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              isInvalid={!category.trim()}
            />
          </Form.Group>
          {/** Price **/}
          <Form.Group className='mb-3'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              isInvalid={price <= 0}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleSubmit} disabled={invalid}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
