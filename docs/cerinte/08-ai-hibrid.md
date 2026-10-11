### 8. Arhitectura Hibridă de Asistență: Motor de Reguli vs. AI Generativ

Pentru a optimiza costurile de operare (reducerea apelurilor API externe) și pentru a asigura un timp de răspuns instantaneu, sistemul de asistență al aplicației nu se bazează exclusiv pe Inteligența Artificială. Arhitectura propusă utilizează un model hibrid, împărțit în două straturi distincte: un sistem determinist pentru monitorizare și un sistem generativ pentru consultanță.

#### .8.1. Stratul 1: Motorul de Reguli (Sistemul de Notificări Proactive)

Acest modul este integrat direct în backend-ul aplicației (Node.js/Python) și funcționează pe baza unor structuri decizionale predefinite de tip condițional (if-else). Acționează ca un sistem de avertizare timpurie, folosind mesaje statice, concepute de specialiști.

- **Logica de Recuperare (Sleep Monitor):**

  - *Condiție tehnică:* Sistemul verifică zilnic variabila ore_somn. Dacă valoarea este \< 6 ore.

  - *Acțiune:* Se declanșează o notificare automată de tip Push: *"Nivelul tău de odihnă este sub media optimă. Recomandăm o intensitate scăzută la antrenamentul de astăzi pentru a preveni accidentările."*

- **Logica de Nutriție (Caloric Gap):**

  - *Condiție tehnică:* Un cron-job rulează la ora 20:00. Dacă variabila calorii_ramase este \> 500 kcal.

  - *Acțiune:* Trimite o alertă: *"Mai ai un deficit caloric semnificativ pentru astăzi. Asigură-te că îți atingi obiectivul de macronutrienți înainte de culcare."*

**Avantajele arhitecturale ale acestui strat:** Execuție instantanee, consum zero de resurse AI și garantarea transmiterii unui mesaj clinic corect, fără riscul de "halucinație" specific modelelor de limbaj.

#### 8.2. Stratul 2: Modulul AI Generativ (On-Demand AI Coach)

Spre deosebire de notificările automate, componenta de Inteligență Artificială (LLM) este apelată strict la cererea utilizatorului (*On-Demand*), în momentul în care se dorește o analiză detaliată sau o soluție creativă.

- **Interacțiunea prin Chat:** Utilizatorul formulează întrebări specifice (ex: *„De ce stagnez în greutate de două săptămâni?”*). Abia în acest moment, backend-ul extrage istoricul ultimelor 14 zile (calorii, somn, antrenamente), le atașează contextului întrebării și apelează API-ul extern (ex: OpenAI) pentru a genera o explicație personalizată.

- **Generarea de Rețete:** AI-ul calculează gramaje și propune combinații alimentare pe baza preferințelor (vegan, fără lactoză) și a bugetului caloric rămas, returnând datele într-un format structurat (JSON) direct în interfață.

  - 
