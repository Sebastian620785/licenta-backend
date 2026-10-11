# Lista de verificări

Fiecare verificare are un motiv. Când o abatere nu se potrivește exact cu un punct de aici,
judecă după motiv. Lista nu e exhaustivă: dacă vezi altceva care contrazice cerințele sau
deciziile, raportează-l.

Verificările C se aplică doar zonelor deja implementate. Nu raporta ca „lipsă” o cerință
dintr-o etapă care n-a început; ea apare doar ca „⏳” în plan.

## A. Contextul față de documentație

- **A1. Documente noi sau modificate** în `docs/` după ultima verificare → cerințele sau
  deciziile lor lipsesc din context? Motiv: un context vechi duce agentul pe un drum greșit.
- **A2. Decizii noi** în `docs/decizii.md` (ID-uri D noi) nereflectate în secțiunea 4.
- **A3. Planul din README** (bife, etape noi) diferit de secțiunea 5.
- **A4. Contradicții între documente** (ex. perioade de analiză 30/60/90 zile vs.
  săptămână/lună/an, greutatea în Profil și în Tracking). Sunt notate la „Întrebări deschise”?
- **A5. Documente `.docx`** în `docs/` fără `.md` echivalent → propune conversia.

## B. Planul față de cod

- **B1. Etapă bifată în README, dar fără dovezi în cod** (modele, rute, servicii, teste) →
  ⚠️ „bifată dar incompletă”. Motiv: la susținere, comisia testează ce scrie în lucrare.
- **B2. Cod implementat care nu apare în plan** (module sau endpoint-uri în afara etapei
  curente) → semnalează-l. Poate fi o abatere de la principiul „câte o etapă pe rând”, sau
  planul trebuie actualizat.
- **B3. Etapa curentă** — ce s-a făcut și ce mai lipsește, față de ce a fost anunțat pentru
  etapă în README și în context.
- **B4. Modificări necomise sau nepublicate** (`git status`, branch în urma remote-ului).
  Motiv: containerele cloud sunt temporare, iar munca necomisă se pierde.

## C. Cerințele și deciziile față de implementare

### Arhitectură și convenții
- **C1. Tiparul pe module:** `src/modules/<modul>/` cu `routes`, `controller`, `service`,
  `schemas`; router-ul montat în `src/app.ts` sub `/api/<modul>`. Logica de business stă în
  service, nu în controller sau în rute (ca să poată fi testată fără HTTP).
- **C2. Validare Zod** pentru orice `req.body`, `req.query` și `req.params` folosit.
  Caută în controllere accese directe la `req.body.x` fără `schema.parse`.
- **C3. Formatul unic al erorilor:** erorile așteptate se aruncă cu `HttpError`. Caută
  răspunsuri ad-hoc de tip `res.status(4xx).json({ message })` care ocolesc `errorHandler`.
- **C4. Comentariile din cod** în română, fără diacritice, explicând „de ce”.

### Securitate și date
- **C5. Fiecare interogare a datelor unui utilizator filtrează după `userId`**, luat din
  token, nu din body sau din URL. Motiv: altfel un utilizator poate citi jurnalul altuia.
  Este cea mai gravă abatere posibilă; verific-o pentru fiecare endpoint nou.
- **C6. Parole** hash-uite cu argon2, niciodată stocate sau logate în clar; refresh token-ul
  stă în cookie `httpOnly`; secretele vin din `env.ts` (validat cu Zod), nu sunt scrise în cod.
- **C7. Ziua din jurnal** este dată calendaristică (`@db.Date` sau string `YYYY-MM-DD`),
  iar profilul are fusul orar. Motiv: o masă de la 23:30 nu trebuie să ajungă în ziua greșită.
- **C8. Snapshot nutrițional:** intrările din jurnal copiază valorile nutriționale la
  adăugare. Motiv: modificarea ulterioară a unui aliment nu trebuie să schimbe istoricul.
- **C9. Alimentele** au valorile la 100 g, inclusiv micronutrienții ceruți (fibre, sodiu,
  calciu, magneziu); produsele OpenFoodFacts se salvează local.
- **C10. Datele biometrice** au câmpul „sursă” (manual / sincronizat).

### Calcule și AI
- **C11. Calculele** (BMR/TDEE, ținte, totaluri, deficit, volum de antrenament, medii din
  rapoarte) au teste unitare cu valori verificate de mână.
- **C12. AI-ul nu calculează valori nutriționale:** backend-ul le calculează din baza de
  alimente; răspunsurile LLM sunt validate cu Zod înainte de a ajunge în jurnal.
- **C13. Motorul de reguli** (somn < 6 h, calorii rămase > 500 la 20:00 ora locală) este
  determinist, iar pragurile sunt configurabile; nu apelează LLM-ul.
- **C14. Nu se folosesc** OpenAI Assistants API (oprit) sau un apel direct la Google Fit ca
  dependență obligatorie (API închis pentru proiecte noi): furnizorii de date sunt în spatele
  unui strat abstract.

### Stiva
- **C15. Dependențe noi** în `package.json` care nu fac parte din stiva aprobată → semnalează
  și cere justificare (ex. Sequelize lângă Prisma, Redis când s-a decis pg-boss).

## D. Procesul de lucru

- **D1.** Fiecare etapă terminată are deciziile ei notate în `docs/decizii.md`.
- **D2.** Bifele din README corespund stării reale.
- **D3.** Codul nou are teste; numărul de teste nu a scăzut între verificări fără motiv.
- **D4.** `docs/context-agent.txt` mai corespunde realității (etape, stivă, probleme
  cunoscute). Dacă nu, propune actualizarea lui.
- **D5.** Commit-uri clare, pe branch-ul de lucru; fără commit-uri directe pe `main`.

## E. Sănătatea proiectului

Doar dacă `node_modules/` există (altfel notează „neverificat — dependențe neinstalate”):

```bash
npm run typecheck
npm test
```

Raportează rezultatul pe scurt; la eșec, numele testelor picate și prima eroare.
