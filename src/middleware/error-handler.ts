import type { ErrorRequestHandler } from 'express';
import { ZodError, z } from 'zod';
import { HttpError } from '../utils/http-error.js';
import { logger } from '../lib/logger.js';

/**
 * Punctul unic in care orice eroare devine un raspuns JSON cu format constant:
 *   { error: { code, message, details? } }
 * Express 5 trimite aici automat si erorile aruncate din handler-ele async.
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Datele trimise nu sunt valide',
        details: z.flattenError(err).fieldErrors,
      },
    });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: { code: err.code, message: err.message, details: err.details },
    });
    return;
  }

  // JSON invalid in body (aruncat de express.json())
  if (err?.type === 'entity.parse.failed') {
    res.status(400).json({ error: { code: 'INVALID_JSON', message: 'Body-ul nu este JSON valid' } });
    return;
  }

  // Eroare neprevazuta: o logam complet, dar clientului nu ii expunem detalii interne.
  logger.error({ err }, 'Eroare neasteptata');
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'A aparut o eroare interna' } });
};
