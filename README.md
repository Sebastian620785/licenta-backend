# GymBeat — Backend

API-ul aplicației GymBeat: monitorizarea nutriției (Eat & Track), a antrenamentelor și a stilului de viață, cu un asistent AI Coach.

Frontend-ul se află în repository-ul separat [`licenta-frontend`](https://github.com/Sebastian620785/licenta-frontend).

## Tehnologii

| Rol | Tehnologie |
|---|---|
| Runtime + limbaj | Node.js 22 + TypeScript |
| Framework HTTP | Express 5 |
| Bază de date | PostgreSQL 16 + pgvector (în Docker) |
| ORM / migrații | Prisma 7 |
| Validare | Zod |
| Logging | pino |
| Teste | Vitest + Supertest |

## Pornire locală

Cerințe: Node.js 22+, Docker.

```bash
npm install            # instalează dependențele și generează clientul Prisma
cp .env.example .env   # configurația locală
npm run db:up          # pornește PostgreSQL în Docker
npm run db:migrate     # aplică migrațiile (din Etapa 1 încolo)
npm run dev            # pornește serverul cu reîncărcare automată
```

Verificare: `http://localhost:3000/api/health` trebuie să răspundă `{"status":"ok","database":"up",...}`.

## Comenzi

| Comandă | Ce face |
|---|---|
| `npm run dev` | server în modul dezvoltare (repornește la fiecare modificare) |
| `npm test` | rulează testele |
| `npm run typecheck` | verifică tipurile TypeScript |
| `npm run build` / `npm start` | compilează și pornește varianta de producție |
| `npm run db:up` / `db:down` | pornește / oprește baza de date |
| `npm run db:migrate` | creează și aplică migrațiile din `prisma/schema.prisma` |
| `npm run db:studio` | interfață vizuală pentru datele din baza de date |

## Structura proiectului

```
src/
  app.ts                 construiește aplicația Express (middleware + rute)
  server.ts              pornește serverul și îl oprește controlat
  config/env.ts          citește și validează variabilele de mediu
  lib/                   instanțe comune: prisma (baza de date), logger
  middleware/            tratarea erorilor, rută inexistentă (404)
  utils/                 utilitare comune (HttpError)
  modules/<modul>/       câte un folder pentru fiecare modul funcțional
prisma/schema.prisma     modelul bazei de date
tests/                   teste automate
docs/decizii.md          jurnalul deciziilor de arhitectură
```

Fiecare modul funcțional (auth, foods, meals, dashboard, recipes, ...) urmează același tipar:

```
<modul>.routes.ts      definește URL-urile și leagă cererea de controller
<modul>.controller.ts  citește și validează cererea (Zod), apelează serviciul, trimite răspunsul
<modul>.service.ts     logica de business (calcule, reguli), fără detalii HTTP
<modul>.schemas.ts     schemele Zod pentru datele de intrare
```

## Formatul erorilor

Toate erorile au aceeași formă, ca frontend-ul să le poată trata uniform:

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Datele trimise nu sunt valide", "details": { "grams": ["..."] } } }
```

## Etape de implementare

- [x] **Etapa 0** — fundația proiectului
- [ ] **Etapa 1** — utilizator, autentificare, profil minim (BMR / TDEE / ținte)
- [ ] **Etapa 2** — baza de alimente (+ OpenFoodFacts)
- [ ] **Etapa 3** — jurnal alimentar și mese
- [ ] **Etapa 4** — endpoint-ul de Dashboard
- [ ] **Etapa 5** — rețete create de utilizator
