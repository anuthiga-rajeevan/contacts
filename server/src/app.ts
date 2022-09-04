import express from 'express';
import path from 'path';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';

import { connectDb } from './db';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import { options } from './docs';

// Connect to database
if (process.env.NODE_ENV !== 'test') connectDb();

const root = path.normalize(`${__dirname}/../../`);

const app = express();

app.use(express.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${root}/frontend/build`));
if (process.env.DEPLOY_ENV !== 'prod') {
  app.use(morgan('dev'));
}

app.use('/api', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(options));

app.use('*', (req, res) => {
  res.sendFile(`${root}/frontend/build/index.html`);
});

app.use(errorHandler);

export default app;