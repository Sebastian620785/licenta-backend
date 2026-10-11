# Jurnalul deciziilor de arhitectură

Fiecare decizie importantă este notată aici, împreună cu motivul ei și cu alternativele analizate.
Documentul poate fi folosit direct în capitolul de implementare al lucrării.

---

## Etapa 0 — Fundația proiectului

### D1. TypeScript în locul JavaScript simplu
- **Decizie:** tot backend-ul (și frontend-ul) este scris în TypeScript.
- **Motiv:** aplicația are multe structuri de date (mese, alimente, macronutrienți, serii de antrenament). Tipurile statice prind la compilare greșeli care în JavaScript ar apărea abia la rulare (ex. un câmp scris greșit, un număr tratat ca text). Păstrează avantajul „un singur limbaj pe client și server”.
- **Alternative:** JavaScript simplu — mai puțină configurare, dar fără verificări înainte de rulare.

### D2. Express 5
- **Decizie:** Express 5 ca framework HTTP.
- **Motiv:** cel mai răspândit framework Node.js, minimal și ușor de explicat. Versiunea 5 transmite automat erorile din funcțiile `async` către handler-ul de erori, eliminând blocurile `try/catch` repetitive.
- **Alternative:** NestJS (mai structurat, dar mult mai mult cod și concepte), Fastify (mai rapid, ecosistem mai mic).

### D3. Prisma 7 ca ORM
- **Decizie:** Prisma pentru accesul la PostgreSQL și pentru migrații.
- **Motiv:** schema bazei de date stă într-un singur fișier lizibil (`prisma/schema.prisma`), migrațiile sunt generate automat, iar interogările sunt complet tipizate. Prisma 7 folosește driver-ul oficial `pg` prin `@prisma/adapter-pg`.
- **Limitare cunoscută:** Prisma nu înțelege nativ tipul `vector` (pgvector). Căutarea semantică pentru RAG se va face cu interogări SQL directe (`$queryRaw`).
- **Alternative:** Sequelize (mai vechi, suport TypeScript slab), Drizzle (suport pgvector nativ, dar ecosistem mai tânăr).

### D4. PostgreSQL cu pgvector, rulat în Docker
- **Decizie:** imaginea `pgvector/pgvector:pg16`; extensia `vector` este activată la prima pornire (`docker/init.sql`).
- **Motiv:** o singură bază de date atât pentru datele relaționale, cât și pentru vectorii RAG. Docker garantează că oricine (inclusiv comisia) pornește exact aceeași versiune cu o singură comandă.

### D5. Validarea datelor cu Zod
- **Decizie:** variabilele de mediu și toate datele primite de la client sunt validate cu Zod.
- **Motiv:** datele invalide sunt respinse la intrare cu un mesaj clar (`400 VALIDATION_ERROR`), iar serviciile lucrează doar cu date corecte și tipizate. Aceleași scheme vor valida mai târziu răspunsurile JSON ale modelului AI.

### D6. Arhitectură pe straturi, organizată pe module
- **Decizie:** `routes → controller → service → Prisma`, cu câte un folder pentru fiecare modul funcțional.
- **Motiv:** separarea responsabilităților — logica de business (ex. calculul caloriilor) nu depinde de HTTP și poate fi testată izolat. Organizarea pe module (nu pe tipuri de fișiere) ține împreună tot codul unei funcționalități.

### D7. Format unic pentru erori
- **Decizie:** toate erorile au forma `{ error: { code, message, details? } }`, produsă de un singur middleware.
- **Motiv:** frontend-ul tratează erorile uniform; erorile neprevăzute sunt logate complet pe server, dar nu expun detalii interne clientului.

### D8. Separarea `app.ts` / `server.ts`
- **Decizie:** `createApp()` construiește aplicația, `server.ts` doar o pornește.
- **Motiv:** testele pot trimite cereri către aplicație (Supertest) fără a deschide un port și fără bază de date reală.
