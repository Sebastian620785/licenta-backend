import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import { env } from './config/env.js';
import { logger } from './lib/logger.js';
import { healthRouter } from './modules/health/health.routes.js';
import { notFound } from './middleware/not-found.js';
import { errorHandler } from './middleware/error-handler.js';

/**
 * Construieste aplicatia Express fara sa porneasca serverul.
 * Separarea app / server permite testarea rutelor cu supertest, fara port deschis.
 */
export function createApp() {
  const app = express();

  // Securitate si infrastructura
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(pinoHttp({ logger }));

  // Rutele modulelor. Fiecare modul nou (auth, foods, meals, ...) se monteaza aici.
  app.use('/api/health', healthRouter);

  // Trebuie sa fie ultimele: ruta inexistenta -> 404, apoi tratarea centralizata a erorilor
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
