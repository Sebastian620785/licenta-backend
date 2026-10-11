import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './lib/logger.js';
import { prisma } from './lib/prisma.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  logger.info(`Serverul ruleaza pe http://localhost:${env.PORT} (${env.NODE_ENV})`);
});

// Oprire controlata: terminam cererile in curs si inchidem conexiunile la baza de date.
async function shutdown(signal: string) {
  logger.info(`${signal} primit, opresc serverul...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
