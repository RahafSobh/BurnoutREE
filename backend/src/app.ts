import cors from 'cors';
import express, { type Express } from 'express';
import { config } from './config/index.js';
import { router } from './routes/index.js';

export function createApp(): Express {
  const app = express();

  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json());

  app.use('/api', router);

  return app;
}
