import { useEffect, type FC } from 'react'
import Form from 'react-bootstrap/Form'
import Pagination from 'react-bootstrap/Pagination'
import { Spinner } from '../ui'
import { ProductCard } from '../components/ProductCard'
import { useProductStore } from '../stores/useProductStore'

export const ProductList: FC = () => {
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

  useEffect(() => {
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
        />
        <Form.Select
          className='ms-2'
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
      ) : (
        products.map((p) => <ProductCard key={p.id} {...p} />)
      )}

      <Pagination className='mt-3'>
        <Pagination.Prev onClick={() => setPage(Math.max(page - 1, 1))} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next onClick={() => setPage(page + 1)} />
      </Pagination>
    </>
  )
}
