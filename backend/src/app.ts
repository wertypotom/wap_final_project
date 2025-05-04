import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/config';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { globalErrorHandler } from './controllers/error.controller';

const app = express();

app.get('/', (req, res) => {});
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

app.use(globalErrorHandler);

export default app;
