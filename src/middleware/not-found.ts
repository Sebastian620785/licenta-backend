import type { RequestHandler } from 'express';
import { HttpError } from '../utils/http-error.js';

export const notFound: RequestHandler = (req, _res, next) => {
  next(new HttpError(404, `Ruta ${req.method} ${req.path} nu exista`, 'NOT_FOUND'));
};
