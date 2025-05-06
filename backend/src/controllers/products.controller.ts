import { Request, Response, NextFunction } from 'express';
import {
  createProduct,
  fetchProductById,
  fetchProducts,
  searchProductsByName,
} from '../services/products.service';
import { catchAsync } from '../utils/catchAsync';

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const { page, category } = req.query;
  const products = await fetchProducts(Number(page) || 1, category?.toString());
  res.json(products);
});

export const searchProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { q } = req.query;
    const products = await searchProductsByName(q?.toString() || '');
    res.json(products);
  },
);

export const postProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await createProduct(req.body);
  res.json(product).status(201);
});

export const getProductById = catchAsync(
  async (req: Request, res: Response) => {
    const product = await fetchProductById(req.params.id);
    res.json(product);
  },
);
