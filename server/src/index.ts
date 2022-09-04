// @ts-nocheck
import colors from 'colors';
colors.enable();

import './common/env';
import app from './app';

const PORT = parseInt(process.env.PORT) || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold),
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
