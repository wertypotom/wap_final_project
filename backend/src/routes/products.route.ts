import { Router } from 'express';
import {
  getProductById,
  getProducts,
  postProduct,
  searchProducts,
} from '../controllers/products.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get paginated list of products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/v1/products/search:
 *   get:
 *     summary: Search products by name
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of matching products
 */
router.get('/search', searchProducts);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Add a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, category, price]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created
 */
router.post('/', postProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product object
 */
router.get('/:id', getProductById);

export { router as productsRouter };
