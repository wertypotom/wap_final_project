import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import { Spinner } from '../ui';
import { ProductCard } from '../components/ProductCard';
import { useProductStore } from '../stores/useProductStore';
import { useDebounce } from '../hooks/useDebounce';

export const ProductList: React.FC = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramPage = Number(searchParams.get('page')) || 1;
  const paramCategory = searchParams.get('category') || '';
  const paramQ = searchParams.get('q') || '';

  const { products, loading, page, category, query, setPage, setCategory, setQuery, loadProducts } =
    useProductStore();

  // Local state for raw input, debounced into store.query
  const [rawQuery, setRawQuery] = useState(paramQ);
  const debouncedQuery = useDebounce(rawQuery, 500);

  useEffect(() => {
    setPage(paramPage);
    setCategory(paramCategory);
    setRawQuery(paramQ);
  }, []);

  useEffect(() => {
    if (!query) {
      setSearchParams({
        ...(page > 1 ? { page: String(page) } : {}),
        ...(category ? { category } : {}),
      });
      loadProducts();
    }
  }, [page, category, query]);

  useEffect(() => {
    setPage(1);
    setQuery(debouncedQuery);
    setSearchParams(
      debouncedQuery
        ? { q: debouncedQuery }
        : {
            ...(page > 1 ? { page: String(page) } : {}),
            ...(category ? { category } : {}),
          }
    );
    loadProducts();
  }, [debouncedQuery]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRawQuery(e.target.value);
  }, []);
  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }, []);
  const prevPage = useCallback(() => setPage(Math.max(page - 1, 1)), [page]);
  const nextPage = useCallback(() => setPage(page + 1), [page]);

  const productItems = useMemo(
    () => products.map((p) => <ProductCard key={p.id} {...p} />),
    [products]
  );

  return (
    <>
      <Form className="mb-3 d-flex">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={rawQuery}
          onChange={handleSearchChange}
          className="me-2"
        />
        <Form.Select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="toys">Toys</option>
        </Form.Select>
      </Form>

      {loading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        productItems
      )}

      <Pagination className="mt-3 justify-content-center">
        <Pagination.Prev onClick={prevPage} disabled={page === 1} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} disabled={products.length < 5} />
      </Pagination>
    </>
  );
});
