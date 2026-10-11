import 'dotenv/config';
import { z } from 'zod';

/**
 * Variabilele de mediu sunt validate o singura data, la pornire.
 * Daca lipseste ceva (ex. DATABASE_URL), aplicatia se opreste imediat cu un mesaj clar,
 * in loc sa esueze mai tarziu, la prima cerere care are nevoie de acea valoare.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL este obligatoriu'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Configuratie invalida:', z.prettifyError(parsed.error));
  process.exit(1);
}

export const env = parsed.data;
export const isProduction = env.NODE_ENV === 'production';
