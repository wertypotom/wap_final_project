import { Request, Response } from 'express';
import {
  fetchReviews,
  addReview,
  editReview,
  removeReview,
} from '../services/reviews.service';
import { catchAsync } from '../utils/catchAsync';

export const getProductReviews = catchAsync(
  async (req: Request, res: Response) => {
    const reviews = await fetchReviews(req.params.id);
    res.json(reviews);
  },
);

export const createReview = catchAsync(async (req: Request, res: Response) => {
  console.log('Hitting createReview');
  const review = await addReview(req.params.id, req.body);
  res.status(201).json(review);
});

export const updateReview = catchAsync(async (req: Request, res: Response) => {
  const updated = await editReview(
    req.params.productId,
    req.params.id,
    req.body,
  );
  res.json(updated);
});

export const deleteReview = catchAsync(async (req: Request, res: Response) => {
  await removeReview(req.params.productId, req.params.id);
  res.status(204).end();
});
