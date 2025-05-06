import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { catchAsync } from '../utils/catchAsync';

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
});

export const reviewSchema = z.object({
  author: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1),
});

export const validateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body = productSchema.parse(req.body);
    next();
  },
);

export const validateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body = reviewSchema.parse(req.body);
    next();
  },
);
