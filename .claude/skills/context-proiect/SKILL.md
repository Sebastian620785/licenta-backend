---
name: context-proiect
description: Construiește și verifică fișierul de context al proiectului de licență GymBeat (.claude/context/context-proiect.md) pe baza documentației din docs/ (cerințe, decizii, plan) și a stării reale a codului. La prima rulare, când contextul nu există, îl creează. La rulările următoare verifică dacă contextul, codul și procesul de lucru sunt conforme cu planul de lucru și cu cerințele de implementare, raportează abaterile și actualizează contextul. Folosește acest skill ori de câte ori utilizatorul cere „verifică contextul”, „suntem conform planului?”, „unde am rămas?”, „ce urmează?”, la începutul sau la finalul unei etape de implementare, după ce adaugă documente noi în docs/, sau când un agent nou preia lucrul la proiect, chiar dacă nu numește skill-ul explicit.
---

# Contextul proiectului GymBeat

Proiectul este o aplicație de licență (GymBeat, similară cu Eat & Track), dezvoltată pas cu pas,
câte o etapă pe rând, de un student care trebuie să poată explica și apăra fiecare decizie.
Lucrul se întinde pe multe sesiuni și, uneori, pe mai mulți agenți AI. Fără o sursă comună de
adevăr, fiecare sesiune ar trebui să redescopere cerințele, iar abaterile de la plan (o cerință
uitată, o etapă bifată dar neterminată, o decizie încălcată) ar ieși la iveală abia la susținere.

Skill-ul are două roluri:
1. **Creează** un fișier de context complet, derivat din documentație și din cod.
2. **Verifică** periodic că documentația, contextul și codul spun același lucru, în acord cu
   planul de lucru și cu cerințele.

## Unde sunt lucrurile

| Ce | Unde |
|---|---|
| Fișierul de context (rezultatul acestui skill) | `.claude/context/context-proiect.md` |
| Cerințele funcționale (câte un fișier pe modul/ecran) | `docs/cerinte/*.md` |
| Jurnalul deciziilor de arhitectură | `docs/decizii.md` |
| Procesul de lucru, stiva, problemele cunoscute | `docs/context-agent.txt` |
| Planul de etape (bife) și structura proiectului | `README.md` |
| Starea reală a codului | `scripts/stare-cod.sh` (în folderul acestui skill) |
| Șablonul fișierului de context | `references/sablon-context.md` |
| Lista de verificări | `references/verificari.md` |

Documentația din `docs/` este sursa de adevăr pentru cerințe și decizii. Contextul este doar un
rezumat derivat din ea; codul este sursa de adevăr pentru ce s-a implementat efectiv. Dacă
utilizatorul adaugă un document `.docx` în `docs/cerinte/`, citește-l cu
`pandoc -t gfm --wrap=none <fisier>.docx` și propune convertirea lui într-un `.md` alături,
ca să poată fi urmărit în git.

## Alegerea modului

Uită-te la argumentele primite și la existența fișierului de context:

- **Fără argumente și `.claude/context/context-proiect.md` nu există** → modul **CREARE**.
- **Fără argumente și contextul există** → modul **VERIFICARE**.
- **Argument `regenereaza` / `init`** → modul **CREARE**, chiar dacă există deja un context
  (păstrează secțiunea „Istoricul verificărilor” din versiunea veche).
- **Orice alt argument** (ex. `etapa 3`, `dashboard`, `autentificare`) → modul **VERIFICARE**,
  concentrat pe acea zonă, dar menționând pe scurt și alte probleme grave găsite.

## Modul CREARE

1. Citește integral toate fișierele din `docs/cerinte/`, apoi `docs/decizii.md`,
   `docs/context-agent.txt` și `README.md`. Nu sări peste niciun document: contextul trebuie să
   acopere toate modulele, nu doar etapa curentă, pentru că deciziile de acum (ex. modelul de
   date) trebuie să țină cont de modulele viitoare.
2. Rulează `bash .claude/skills/context-proiect/scripts/stare-cod.sh` pentru starea reală a
   codului (module, rute, modele Prisma, teste, commit-uri, bife).
3. Creează folderul `.claude/context/` și scrie `context-proiect.md` urmând exact structura din
   `references/sablon-context.md`. Reguli:
   - Fiecare cerință primește un ID stabil (ex. `R-DASH-03`) și sursa ei (fișierul din
     `docs/cerinte/`). ID-urile fac posibilă trasabilitatea cerință → etapă → cod → test,
     utilă și în lucrarea de licență.
   - Scrie doar ce apare în surse. Unde documentele se contrazic sau sunt incomplete, nu
     alege tu: notează contradicția la „Întrebări deschise”.
   - Starea fiecărei etape se stabilește din cod (dovezi: fișiere, modele, teste), nu doar din
     bifele din README.
4. Rulează imediat o VERIFICARE scurtă (pașii de mai jos) ca să populezi secțiunile de stare și
   prima intrare din „Istoricul verificărilor”.
5. Prezintă utilizatorului un rezumat: câte cerințe pe module, etapa curentă, problemele
   găsite, întrebările deschise.

## Modul VERIFICARE

1. Citește contextul existent.
2. Rulează `scripts/stare-cod.sh`.
3. Recitește documentele din `docs/` care s-au schimbat de la ultima verificare (compară cu data
   și commit-ul de referință notate în antetul contextului; dacă ai dubii, recitește tot).
4. Parcurge verificările din `references/verificari.md`, în ordine:
   A. contextul față de documentație (e la zi?);
   B. planul față de cod (etapele bifate sunt cu adevărat gata?);
   C. cerințele și deciziile față de implementare (codul respectă ce s-a stabilit?);
   D. procesul de lucru (decizii notate, README actualizat, teste);
   E. sănătatea proiectului (typecheck, teste) — doar dacă dependențele sunt instalate.
   Pentru fiecare constatare, citește codul relevant; nu trage concluzii doar din numele
   fișierelor. O abatere raportată greșit îl face pe student să piardă timp și încredere.
5. Scrie raportul în chat, în formatul de mai jos.
6. Actualizează contextul:
   - **Actualizează direct** secțiunile factuale: antetul (data, commit-ul de referință),
     „Starea codului”, starea etapelor și matricea de trasabilitate (cu dovezi), plus o intrare
     nouă în „Istoricul verificărilor”.
   - **Nu modifica fără acordul utilizatorului** cerințele, planul de etape, deciziile sau
     stiva. Acestea sunt decizii ale studentului; dacă documentația s-a schimbat sau ai găsit o
     contradicție, propune modificarea în raport și aplic-o doar după confirmare.
7. Containerele cloud sunt temporare, deci contextul trebuie salvat în git: fă commit pe
   branch-ul curent de lucru (mesaj: `Context: verificare <data> - <rezumat scurt>`) și push,
   conform procesului de lucru al proiectului. Nu deschide PR-uri.

## Formatul raportului de verificare

Folosește această structură, în română, concisă (doar constatările, fără a repeta ce e în regulă
în detaliu):

```
# Verificare context — <data>

**Rezumat:** ✅ <n> conforme · ⚠️ <n> abateri · ❌ <n> lipsuri · ❓ <n> întrebări
**Etapa curentă:** <etapa> — <stare într-o frază>

## A. Contextul față de documentație
## B. Planul față de cod
## C. Cerințe și decizii față de implementare
## D. Procesul de lucru
## E. Sănătatea proiectului

## Acțiuni propuse
1. <cea mai importantă întâi; pentru fiecare: ce, unde (fișier:linie), de ce>

## Ce am actualizat în context
```

Fiecare constatare are forma: simbol, ID cerință/decizie (dacă există), ce ai găsit, dovada
(`fisier:linie` sau comanda rulată). Exemplu:

```
⚠️ R-JURNAL-02 / decizia „ziua ca dată calendaristică”: modelul MealDay folosește
   `date DateTime` fără `@db.Date` (prisma/schema.prisma:42) — o masă de la 23:30 poate
   ajunge în ziua greșită din cauza fusului orar.
```

Dacă nu există nicio abatere, spune asta clar într-o frază și indică pasul următor din plan.

## Ton

Studentul trebuie să înțeleagă constatările, nu doar să le primească. Explică pe scurt de ce
contează fiecare abatere (ce s-ar strica, ce ar întreba comisia). Fără jargon inutil.
