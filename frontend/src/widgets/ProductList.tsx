import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import Form from 'react-bootstrap/Form'
import Pagination from 'react-bootstrap/Pagination'
import { Spinner } from '../ui'
import { ProductCard } from '../components/ProductCard'
import { useProductStore } from '../stores/useProductStore'

export const ProductList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramPage = Number(searchParams.get('page')) || 1
  const paramCategory = searchParams.get('category') || ''
  const paramQ = searchParams.get('q') || ''

  const {
    products,
    loading,
    page,
    category,
    query,
    setPage,
    setCategory,
    setQuery,
    loadProducts,
  } = useProductStore()

  // Initialize store from URL once
  useEffect(() => {
    setPage(paramPage)
    setCategory(paramCategory)
    setQuery(paramQ)
  }, [])

  // Sync store → URL & reload
  useEffect(() => {
    setSearchParams({
      ...(page > 1 ? { page: String(page) } : {}),
      ...(category ? { category } : {}),
      ...(query ? { q: query } : {}),
    })
    loadProducts()
  }, [page, category, query])

  return (
    <>
      <Form className='mb-3 d-flex'>
        <Form.Control
          type='text'
          placeholder='Search...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='me-2'
        />
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>All Categories</option>
          <option value='Electronics'>Electronics</option>
          <option value='Home Appliances'>Home Appliances</option>
          <option value='toys'>Toys</option>
        </Form.Select>
      </Form>

      {loading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <p className='text-center'>No products found.</p>
      ) : (
        products.map((p) => <ProductCard key={p.id} {...p} />)
      )}

      <Pagination className='mt-3 justify-content-center'>
        <Pagination.Prev
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
        />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next
          onClick={() => setPage(page + 1)}
          disabled={products.length < 10}
        />
      </Pagination>
    </>
  )
}
