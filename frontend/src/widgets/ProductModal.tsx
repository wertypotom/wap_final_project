import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { Button } from '../ui';
import type { IProductInput } from '../types';
import { createProduct } from '../services/productService';
import { useToastStore } from '../stores/useToastStore';
import { useProductStore } from '../stores/useProductStore';

interface Props {
  show: boolean;
  onHide: () => void;
}

const categories = [
  { value: '', label: 'Select category' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Home Appliances', label: 'Home Appliances' },
  { value: 'toys', label: 'Toys' },
];

export const ProductModal: React.FC<Props> = ({ show, onHide }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const addToast = useToastStore((s) => s.addToast);
  const loadProducts = useProductStore((s) => s.loadProducts);

  useEffect(() => {
    if (!show) {
      setName('');
      setDescription('');
      setCategory('');
      setPrice('');
    }
  }, [show]);

  const handleSubmit = async () => {
    const payload: IProductInput = {
      name: name.trim(),
      description: description.trim(),
      category,
      price: parseFloat(price),
    };
    try {
      await createProduct(payload);
      addToast('Product added', 'success');
      loadProducts();
      onHide();
    } catch {
      addToast('Failed to add product', 'danger');
    }
  };

  const nameInvalid = name.trim() === '';
  const descInvalid = description.trim() === '';
  const catInvalid = category === '';
  const priceValue = parseFloat(price);
  const priceInvalid = isNaN(priceValue) || priceValue <= 0;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={nameInvalid}
            />
            <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={descInvalid}
            />
            <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              isInvalid={catInvalid}
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please select a category.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              isInvalid={priceInvalid}
            />
            <Form.Control.Feedback type="invalid">
              Enter a valid price greater than 0.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={nameInvalid || descInvalid || catInvalid || priceInvalid}
        >
          Add Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
