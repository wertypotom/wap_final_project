import { prisma } from '../db/client';

export const fetchReviews = async (productId: string) => {
  return prisma.review.findMany({
    where: { productId },
    orderBy: [{ sentiment: 'desc' }, { rating: 'desc' }],
  });
};

export const addReview = async (productId: string, data: any) => {
  const { author, rating, comment, sentiment, isSpam } = data;
  const review = await prisma.review.create({
    data: { productId, author, rating, comment, sentiment, isSpam },
  });

  const reviews = await prisma.review.findMany({
    where: { productId, isSpam: false },
  });
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

  await prisma.product.update({
    where: { id: productId },
    data: { averageRating: avg },
  });

  return review;
};

export const editReview = async (productId: string, id: string, data: any) => {
  return prisma.review.update({
    where: { id },
    data,
  });
};

export const removeReview = async (productId: string, id: string) => {
  await prisma.review.delete({ where: { id } });

  const reviews = await prisma.review.findMany({
    where: { productId, isSpam: false },
  });
  const avg = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  await prisma.product.update({
    where: { id: productId },
    data: { averageRating: avg },
  });
};
