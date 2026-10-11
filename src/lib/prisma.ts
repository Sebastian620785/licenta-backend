import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { env } from '../config/env.js';

/**
 * O singura instanta PrismaClient pentru toata aplicatia (pool comun de conexiuni).
 * Prisma 7 se conecteaza la PostgreSQL prin driver adapter-ul oficial `pg`.
 */
const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });
