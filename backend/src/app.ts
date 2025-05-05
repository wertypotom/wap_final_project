import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/config';
import { specs, swaggerUi } from './config/swagger';

import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { globalErrorHandler } from './controllers/error.controller';
import { AppError } from './utils/appError';
import { productsRouter } from './routes/products.route';

const app = express();

app.use(cors());

// Development logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Set security HTTP headers
app.use(helmet());

// Parses incoming requests with JSON payloads
app.use(express.json());

// 3) ROUTES
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1/products', productsRouter);

// Do check for all request type
app.all('/{*any}', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
