# Șablonul fișierului de context

Scrie `.claude/context/context-proiect.md` cu exact aceste secțiuni, în această ordine.
Textul dintre `<...>` se înlocuiește; comentariile `<!-- -->` explică ce trebuie să conțină
secțiunea și nu se copiază în fișierul final.

Ținta de lungime este ca un agent nou să înțeleagă proiectul citind doar acest fișier
(aprox. 300–600 de linii). Rezumă, dar nu pierde cerințe: fiecare cerință verificabilă din
`docs/cerinte/` trebuie să aibă un rând.

---

```markdown
# Contextul proiectului GymBeat

> Fișier generat și întreținut de skill-ul `context-proiect`. Sursa de adevăr rămâne `docs/`
> (cerințe, decizii) și codul. Nu edita manual secțiunile marcate „(automat)”.

| | |
|---|---|
| Creat | <data> |
| Ultima verificare | <data> |
| Commit de referință | <hash scurt> — <mesaj> |
| Branch de lucru | <branch> |
| Surse citite | <lista fișierelor din docs/ + README.md> |

## 1. Proiectul pe scurt
<!-- 5–10 rânduri: ce este aplicația, pentru cine, obiectivele din lucrare, cele două
     repository-uri (backend, frontend), ce repo se ignoră. -->

## 2. Cerințe pe module
<!-- Câte o subsecțiune pe ecran/modul, în ordinea ecranelor. Tabel cu ID stabil.
     Prefixe: GEN (general), INFO (modul informativ), DASH (Ecranul 2), JURNAL (mese și
     alimente), TRACK (Ecranul 4), WORK (Ecranul 5), PROF (Ecranul 6), RET (Ecranul 7),
     AI (arhitectura hibridă), RAG, FIT (Google Fit / furnizori de date), STACK.
     Prioritate: Obligatoriu / Opțional / Ulterior (după cum spune documentul).
     ID-urile nu se renumerotează niciodată; o cerință eliminată se marchează „Eliminată”. -->

### 2.x <Nume modul> — `docs/cerinte/<fisier>.md`
| ID | Cerință | Prioritate | Note |
|---|---|---|---|
| R-DASH-01 | <cerința, o frază> | Obligatoriu | <ex. „OpenFoodFacts”> |

### Legături între module
<!-- Ce date curg între module (ex. Profil → ținte → Dashboard). -->

## 3. Stiva tehnologică aprobată
<!-- Backend, bază de date, frontend, teste, unelte planificate. Cu versiuni când sunt
     cunoscute din package.json. Include și ce a fost respins explicit (ex. Assistants API). -->

## 4. Decizii de arhitectură
<!-- Câte un rând pe decizie: ID din docs/decizii.md (D1, D2...) + rezumat într-o frază.
     Adaugă și deciziile din docs/context-agent.txt care nu au încă un ID în decizii.md,
     marcate „(nenotată în decizii.md)” — asta e o abatere de proces de raportat. -->

## 5. Planul de lucru și starea etapelor (automat)
<!-- Toate etapele (backend și frontend), cu stare și dovezi. Stări:
     ✅ Gata (cod + teste + documentație), 🔄 În lucru, ⏳ Neîncepută, ⚠️ Bifată dar incompletă. -->
| Etapa | Conținut | Stare | Dovezi |
|---|---|---|---|
| Etapa 0 | Fundația proiectului | ✅ | src/app.ts, tests/app.test.ts (4 teste), commit <hash> |

**Pasul următor:** <etapa următoare și ce presupune, 2–4 rânduri>

## 6. Starea codului (automat)
<!-- Din scripts/stare-cod.sh: module, rute montate, endpoint-uri, modele Prisma, migrații,
     număr de teste, starea frontend-ului. -->

## 7. Convenții și procesul de lucru
<!-- Structura unui modul, formatul erorilor, regulile pentru comentarii, teste obligatorii,
     ciclul de lucru pe etapă (explică → aprobare → implementează → verifică → commit/push →
     explică → actualizează decizii și README). -->

## 8. Probleme cunoscute și riscuri
<!-- Ex. Google Fit închis, Assistants API oprit, fus orar, iOS push, limite OpenFoodFacts,
     capcane tehnice (Prisma 7, Express 5, Vitest 5). -->

## 9. Întrebări deschise
<!-- Ce nu este încă decis sau descris (ex. Ecranele 1 și 3), contradicții între documente.
     Fiecare cu sursa contradicției. Se șterg doar după răspunsul utilizatorului. -->

## 10. Matricea de trasabilitate (automat)
<!-- Doar pentru cerințele din etapele începute sau terminate. -->
| Cerință | Etapa | Implementare | Teste | Stare |
|---|---|---|---|---|
| R-DASH-01 | Etapa 4 | src/modules/dashboard/dashboard.service.ts | tests/dashboard.test.ts | ✅ |

## 11. Istoricul verificărilor (automat)
| Data | Commit | Rezultat | Note |
|---|---|---|---|
| <data> | <hash> | ✅ 12 · ⚠️ 1 · ❌ 0 | <ce s-a constatat, o frază> |
```
