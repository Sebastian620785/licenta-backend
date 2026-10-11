import request from 'supertest';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { createApp } from '../src/app.js';

// Inlocuim clientul Prisma cu un fals: testele nu au nevoie de o baza de date reala.
// vi.mock este mutat automat inaintea importurilor, deci app.ts primeste falsul.
const db = vi.hoisted(() => ({ up: true }));
vi.mock('../src/lib/prisma.js', () => ({
  prisma: {
    $queryRaw: async () => {
      if (!db.up) throw new Error('connection refused');
      return [{ '?column?': 1 }];
    },
  },
}));

const app = createApp();

describe('GET /api/health', () => {
  beforeEach(() => {
    db.up = true;
  });

  it('raspunde 200 cand baza de date este disponibila', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok', database: 'up' });
  });

  it('raspunde 503 cand baza de date nu raspunde', async () => {
    db.up = false;

    const res = await request(app).get('/api/health');

    expect(res.status).toBe(503);
    expect(res.body).toMatchObject({ status: 'degraded', database: 'down' });
  });
});

describe('tratarea erorilor', () => {
  it('raspunde 404 cu format standard pentru o ruta inexistenta', async () => {
    const res = await request(app).get('/api/nu-exista');

    expect(res.status).toBe(404);
    expect(res.body.error).toMatchObject({ code: 'NOT_FOUND' });
  });

  it('raspunde 400 pentru JSON invalid', async () => {
    const res = await request(app)
      .post('/api/health')
      .set('Content-Type', 'application/json')
      .send('{ invalid');

    expect(res.status).toBe(400);
    expect(res.body.error).toMatchObject({ code: 'INVALID_JSON' });
  });
});
