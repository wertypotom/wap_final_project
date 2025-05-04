import { NextFunction, Response, Request } from 'express';

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
