import { Router } from 'express';
import {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/reviews.controller';
import { aiModeration } from '../middlewares/ai.middleware';
import { validateReview } from '../middlewares/validate.middleware';

const router = Router();

/**
 * @swagger
 * /products/{id}/reviews:
 *   get:
 *     summary: Get all reviews for a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/:id/reviews', getProductReviews);

/**
 * @swagger
 * /products/{id}/reviews:
 *   post:
 *     summary: Add a review for a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [author, rating, comment]
 *             properties:
 *               author:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 *       400:
 *         description: Invalid review payload
 */
router.post('/:id/reviews', validateReview, aiModeration, createReview);

/**
 * @swagger
 * /products/{productId}/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated
 */
router.put('/:productId/reviews/:id', validateReview, updateReview);

/**
 * @swagger
 * /products/{productId}/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Review deleted
 */
router.delete('/:productId/reviews/:id', deleteReview);

export { router as reviewsRouter };
