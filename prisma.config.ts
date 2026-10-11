import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Necesar doar pentru comenzile care ating baza de date (migrate, studio).
    // `prisma generate` (rulat automat la npm install) functioneaza si fara .env.
    url: process.env.DATABASE_URL,
  },
});
