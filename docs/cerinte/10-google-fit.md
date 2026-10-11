# Integrarea Serviciilor Externe: Google Fit REST API

## 1. Obiectivul Integrării (Ce îmi propun să realizez)

Pentru a reduce "frecarea cognitivă" (efortul manual de introducere a datelor) și pentru a oferi Modulului AI Coach date biometrice de înaltă acuratețe, aplicația va automatiza colectarea parametrilor de sănătate. Obiectivul este conectarea aplicației web cu ecosistemul Google Fit (și noul standard Health Connect) pentru a extrage automat, în fundal, numărul zilnic de pași și detaliile sesiunilor de somn (durată și faze), folosind un sistem de autorizare securizat.

## 2. Arhitectura Soluției

Deoarece proiectul este o aplicație web (nu o aplicație mobilă nativă), extragerea datelor nu se face direct din hardware-ul telefonului, ci printr-o arhitectură **Cloud-to-Cloud**. Backend-ul aplicației va comunica direct cu serverele Google prin intermediul **Google Fit REST API**, utilizând protocolul de securitate **OAuth 2.0** pentru delegarea accesului.

## 3. Metodologia de Implementare (Cum voi face asta pas cu pas)

### Pasul 1: Configurarea Mediului Google Cloud (Pre-rechizite)

Înainte de scrierea codului, aplicația trebuie înregistrată ca o entitate de încredere în ecosistemul Google.

- Se creează un proiect nou în **Google Cloud Console**.

- Se activează biblioteca **Fitness API** pentru acest proiect.

- Se creează credențialele de tip *OAuth 2.0 Client IDs*. Acest pas generează un **Client ID** (public) și un **Client Secret** (privat, stocat în siguranță pe serverul backend).

- Se configurează **Scopes** (Permisiunile vizibile pentru utilizator). Pentru acest proiect se vor folosi: fitness.activity.read (pentru pași) și fitness.sleep.read (pentru somn).

### Pasul 2: Fluxul de Autorizare OAuth 2.0 (Frontend)

Acesta este punctul de interacțiune vizuală în care utilizatorul își dă consimțământul.

1.  În Ecranul 6 (Profil), utilizatorul apasă butonul "Conectează Google Fit".

2.  Aplicația redirecționează utilizatorul către o pagină securizată găzduită de Google.

3.  Utilizatorul se autentifică și aprobă permisiunile solicitate de aplicația "GymBeat".

4.  Google redirecționează utilizatorul înapoi în aplicație, adăugând în URL un cod temporar (**Authorization Code**).

### Pasul 3: Gestiunea Token-urilor Criptografice (Backend)

Pentru a menține securitatea, extragerea datelor se face exclusiv de către server (Backend).

- Frontend-ul trimite *Authorization Code-ul* către Backend.

- Backend-ul contactează serverele Google și schimbă acest cod pe două token-uri: un **Access Token** (valabil o perioadă scurtă, folosit pentru a descărca datele) și un **Refresh Token** (o cheie pe termen lung).

- *Refresh Token-ul* este criptat și salvat în baza de date SQL, atașat profilului utilizatorului, permițând aplicației să ceară date noi zilnic fără ca utilizatorul să se mai logheze manual la Google.

### Pasul 4: Interogarea și Salvarea Datelor (Data Retrieval)

Ultimul pas constă în sincronizarea efectivă a metricilor.

- Backend-ul execută un **HTTP GET/POST Request** către endpoint-urile Google Fit API (ex: dataset:aggregate).

- Sistemul solicită datele pentru un interval de timp specific (ex: ultimele 24 de ore).

- Google răspunde cu un obiect formatat **JSON** care conține datele brute (ex: 8500 pași, 7 ore de somn).

- Backend-ul prelucrează JSON-ul și inserează valorile în tabelul Biometrics_Tracking din baza de date a aplicației, făcându-le instantaneu disponibile pentru rapoarte și pentru analiza Modulului AI.
