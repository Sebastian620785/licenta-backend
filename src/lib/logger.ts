import { pino } from 'pino';
import { env, isProduction } from '../config/env.js';

export const logger = pino({
  level: env.LOG_LEVEL,
  // In dezvoltare, log-uri colorate si lizibile; in productie, JSON (usor de procesat automat).
  transport: isProduction || env.NODE_ENV === 'test' ? undefined : { target: 'pino-pretty' },
});
