import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/config';
import { specs, swaggerUi } from './config/swagger';

import helmet from 'helmet';
import { globalErrorHandler } from './controllers/error.controller';
import { AppError } from './utils/appError';
import { productsRouter } from './routes/products.route';
import { reviewsRouter } from './routes/reviews.route';

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Development logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Set security HTTP headers
app.use(helmet());

// Parses incoming requests with JSON payloads
app.use(express.json());

// 3) ROUTES
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/products', reviewsRouter);

// Do check for all request type
app.all('/{*any}', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
