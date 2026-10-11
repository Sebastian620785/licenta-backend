Ecranul 2: Dashboard-ul Principal (Modulul Eat & Track)

Dashboard-ul reprezintă ecranul principal de interacțiune zilnică al utilizatorului cu aplicația. Arhitectura acestui ecran a fost proiectată pentru a oferi o vedere de ansamblu instantanee asupra progresului nutrițional curent, facilitând în același timp un proces rapid și intuitiv de înregistrare a datelor (frecare cognitivă minimă).

Acest ecran integrează următoarele componente funcționale și vizuale:

1\. **Navigarea Temporală (Istoric)**

- Grilă de navigare (Calendar orizontal): Permite utilizatorului să comute rapid între ziua curentă, zilele precedente și cele viitoare. Prin glisare stânga-dreapta, interfața se actualizează pentru a reflecta alimentele consumate ieri, permițând analiza deficitului/surplusului caloric istoric.

2\. **Secțiunea de Analiză a Metricilor (Sumarul Zilei**)

Această zonă superioară conține „cartonașe” de bord (widgets) care afișează matematic progresul zilnic, ajustat în funcție de obiectivul setat (slăbire, menținere sau hipertrofie):

- Widget Calorii (CICO): O bară de progres sau un grafic circular care prezintă ecuația principală: Calorii Consumate vs. Calorii Rămase. De asemenea, afișează dinamic o valoare absolută a deficitului sau surplusului creat în acea zi.

- Widget Macronutrienți: Afișează defalcarea exactă la nivel de gram pentru Proteine, Carbohidrați și Grăsimi (Consumat / Obiectiv Total).

- Widget Micronutrienți (Opțional / Extensibil): Monitorizează valori de finețe, precum aportul de sare (sodiu), fibre alimentare, calciu sau magneziu, esențiale pentru calitatea optimă a recuperării.

- Widget Hidratare: Un contor rapid pentru monitorizarea consumului de apă, esențial pentru sportivi.

3\. **Gestiunea Meselor (Jurnalul Alimentar Dinamic)**

Partea centrală a ecranului este dedicată introducerii alimentelor, fiind concepută pentru rapiditate și flexibilitate:

- Mese Predefinite & Customizare: Aplicația oferă standard 3 mese principale (Mic dejun, Prânz, Cină), dar include un buton de "Adaugă Masă". Această funcționalitate dinamică este crucială pentru sportivi sau practicanții de bodybuilding, care pot necesita 5 sau mai multe mese zilnice.

- Micro-Statistici per Masă: Fiecare bloc de masă are propriul său rezumat, arătând câte calorii și câți macronutrienți reprezintă acea masă specifică din totalul zilnic.

- Funcția „Copiază de ieri” (Copy from yesterday): Un buton de accelerare a fluxului de lucru, esențial pentru utilizatorii care consumă mese repetitive (ex: același mic dejun), reducând timpul de logare la un singur click.

- Integrarea Scanerului (Barcode Scanner): Pictogramă vizibilă lângă butonul de căutare a alimentelor, permițând deschiderea camerei pentru interogarea instantanee a bazei de date (prin API-ul OpenFoodFacts).

4\. **Notificări Inteligente și Puntea către AI Coach** Deoarece aplicația nu este doar un instrument de logare pasivă, Dashboard-ul servește ca punct de declanșare pentru Modulul AI:

- Sistem de Alerte Contextuale (Notificări Push): Dacă algoritmul detectează o anumită oră târzie (ex: 20:00) și un deficit caloric neacoperit masiv, declanșează o notificare de tip alertă pe Dashboard.

- Butonul "Comunică cu AI Coach": Lângă aceste alerte de deficit/surplus, va exista o scurtătură care deschide un dialog direct cu inteligența artificială (Ecranul 7). De exemplu, utilizatorul poate apăsa butonul pentru a cere instantaneu o idee de masă care să îi închidă exact macronutrienții lipsă.

(Notă: Setările majore, precum ajustarea radicală a obiectivului de masă/slăbire sau a distribuției de macronutrienți, vor fi accesate prin redirecționare din Dashboard către Ecranul 6 - Profil, pentru a menține interfața principală fluidă și neîncărcată).
