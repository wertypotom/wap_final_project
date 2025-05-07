import { api } from './api';
import { type IProduct, type IProductInput } from '../types';

export async function fetchProducts(
  page: number,
  category: string,
  query: string
): Promise<IProduct[]> {
  if (query.trim() !== '') {
    const resp = await api.get<IProduct[]>('/products/search', {
      params: { q: query.trim() },
    });
    return resp.data;
  }

  const params: Record<string, string | number> = { page };
  if (category) params.category = category;

  const resp = await api.get<IProduct[]>('/products', { params });
  return resp.data;
}

export async function fetchProductById(id: string): Promise<IProduct> {
  const response = await api.get<IProduct>(`/products/${id}`);
  return response.data;
}

export async function createProduct(data: IProductInput): Promise<IProduct> {
  const response = await api.post<IProduct>('/products', data);
  return response.data;
}
