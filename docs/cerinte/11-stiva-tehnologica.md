# Alegerea Stivei Tehnologice (Tech Stack) și Justificarea Arhitecturii

Pentru dezvoltarea platformei, a fost necesară selectarea unei stive tehnologice care să asigure performanță, scalabilitate și un timp de dezvoltare optimizat. În urma analizei cerințelor sistemului (gestiune baze de date relaționale, procesare asincronă, integrare AI și interfață interactivă), s-a optat pentru arhitectura **Full-Stack JavaScript**, specific stiva **PERN** (PostgreSQL, Express.js, React.js, Node.js).

## 1. Interfața Utilizator (Frontend)

Pentru construirea interfeței grafice cu care interacționează utilizatorul, tehnologiile standard (HTML5 și CSS3) sunt augmentate de utilizarea unei biblioteci moderne bazate pe JavaScript.

- **Tehnologia aleasă: React.js**

- **Variante analizate:** Angular, Vue.js, JavaScript "Vanilla" (simplu).

- **Justificarea alegerii:** S-a optat pentru React.js (dezvoltat de Meta) datorită arhitecturii sale bazate pe componente reutilizabile. Aceasta permite construirea unor elemente vizuale izolate (ex: cardul pentru o masă, graficul de calorii) care pot fi instanțiate de multiple ori fără duplicarea codului. De asemenea, ecosistemul React facilitează tranziția rapidă către o Aplicație Web Progresivă (PWA).

## 2. Logica de Server și API-ul (Backend)

Backend-ul reprezintă nucleul de procesare al aplicației, gestionând cererile, securitatea și comunicarea cu serviciile externe (AI, Google Fit).

- **Tehnologia aleasă: Node.js (împreună cu framework-ul Express.js)**

- **Variante analizate:**

  - *Java (Spring Boot):* Respins din cauza gradului ridicat de verbozitate (necesită mult cod de configurare) și a timpului de dezvoltare prelungit, nefiind ideal pentru prototipare rapidă.

  - *Python (FastAPI/Django):* O alternativă puternică, în special pentru integrarea AI. Totuși, a fost evitată pentru a nu introduce un al doilea limbaj de programare major în ecosistemul aplicației.

- **Justificarea alegerii:** Utilizarea Node.js permite rularea codului JavaScript pe server. Astfel, se obține o aplicație "isomorfică" (se folosește același limbaj de programare atât pe client, cât și pe server). Acest aspect elimină fenomenul de "context switching" (schimbarea contextului mental între sintaxe diferite), accelerând masiv dezvoltarea și reducând probabilitatea erorilor. Node.js este, prin natura sa asincronă, extrem de performant în gestionarea simultană a multiplelor cereri I/O (citiri din baza de date, apeluri către API-uri externe).

## 3. Sistemul de Gestiune a Bazelor de Date

Aplicația necesită stocarea structurată a datelor biometrice, a jurnalelor alimentare și a structurilor complexe de antrenament.

- **Tehnologia aleasă: PostgreSQL** (accesată prin intermediul unui ORM - Object Relational Mapper, precum Prisma sau Sequelize).

- **Variante analizate:** MongoDB (bază de date NoSQL).

- **Justificarea alegerii:** Deși bazele de date NoSQL (precum MongoDB) oferă flexibilitate, datele acestei aplicații sunt profund relaționale (ex: un utilizator *deține* mai multe jurnale, un jurnal *conține* mai multe mese, o masă *conține* mai multe alimente). PostgreSQL garantează integritatea referențială a acestor legături. Un factor decisiv în favoarea PostgreSQL este extensia pgvector, care permite stocarea nativă a vectorilor matematici. Această funcționalitate este crucială pentru implementarea ulterioară a arhitecturii RAG (generarea de răspunsuri AI pe baza documentelor științifice indexate), eliminând necesitatea achiziționării unui serviciu terț de bază de date vectorială.

## 4. Concluzie asupra Arhitecturii

Decizia de a utiliza un ecosistem unificat 100% JavaScript (React + Node.js) susținut de o bază de date relațională robustă (PostgreSQL) asigură un echilibru optim între inovație tehnologică, stabilitate a datelor și fezabilitate a implementării pentru un dezvoltator individual.
