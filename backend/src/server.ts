import app from './app';
import { config } from './config/config';

// for any programming errors. We need to handle these errors since it is creates unobvious application state
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

// for errors that occured outside of our regular error handling
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
