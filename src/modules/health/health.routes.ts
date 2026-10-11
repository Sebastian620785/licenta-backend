import { Router } from 'express';
import { prisma } from '../../lib/prisma.js';

export const healthRouter = Router();

/**
 * GET /api/health
 * Verifica daca serverul ruleaza si daca baza de date raspunde.
 * Folosit la dezvoltare si de platformele de hosting pentru monitorizare.
 */
healthRouter.get('/', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'up', timestamp: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: 'degraded', database: 'down', timestamp: new Date().toISOString() });
  }
});
