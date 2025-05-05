import prisma from './../db/client';

export const fetchProducts = async (page: number, category?: string) => {
  const take = 10;
  const skip = (page - 1) * take;

  const where = category ? { category } : {};

  return prisma.product.findMany({
    where,
    orderBy: { dateAdded: 'desc' },
    skip,
    take,
  });
};

export const searchProductsByName = async (q: string) => {
  return prisma.product.findMany({
    where: {
      name: { contains: q, mode: 'insensitive' },
    },
    orderBy: { dateAdded: 'desc' },
  });
};
