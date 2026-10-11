# Arhitectura Inteligenței Artificiale Personalizate: Metodologia RAG

Acest capitol detaliază arhitectura tehnică utilizată pentru a asigura acuratețea științifică și relevanța medicală a răspunsurilor oferite de Modulul AI Coach, eliminând riscul de halucinație inerent modelelor de limbaj mari (LLM).

## 1. Problema Modelelor Standard (Riscul de Halucinație)

Utilizarea unui model de limbaj standard (precum GPT-4) în domeniul sănătății și nutriției prezintă un risc major: modelul poate "halucina" (inventa) informații, bazându-se pe asocieri statistice din datele sale generale de antrenament, în loc să ofere protocoale medicale stricte. Pentru o aplicație dedicată monitorizării și optimizării biologice, acest risc este inacceptabil.

## 2. Soluția Propusă: Retrieval-Augmented Generation (RAG)

Pentru a garanta rigoarea științifică a sfaturilor oferite, sistemul nu se bazează pe memoria generală a modelului AI. În schimb, implementează o arhitectură **RAG (Retrieval-Augmented Generation - Generare Augmentată prin Regăsire)**. Această tehnologie permite conectarea modelului AI la o bază de cunoștințe privată, aprobată și controlată exclusiv de administratorul aplicației (ex: studii clinice, manuale de nutriție, protocoale de antrenament recunoscute).

## 3. Fluxul Tehnologic RAG (Cum funcționează pas cu pas)

1.  **Faza de Ingestie și Vectorizare:** Documentele de specialitate (PDF, texte) sunt procesate de sistem și transformate în reprezentări matematice numite "vectori". Acestea sunt stocate într-o Bază de Date Vectorială (ex: Pinecone, ChromaDB).

2.  **Faza de Interogare (Retrieval):** Când utilizatorul formulează o întrebare (ex: "Câte proteine trebuie să consum pentru hipertrofie?"), sistemul nu trimite întrebarea direct către AI. Mai întâi, caută în baza de date vectorială fragmentele de text care se potrivesc semantic cu întrebarea.

3.  **Faza de Generare Augmentată (Generation):** Backend-ul extrage paragrafele relevante găsite și construiește un prompt strict de forma: *"Ești un expert. Răspunde la întrebarea utilizatorului folosind STRICT următoarele informații extrase din documentele noastre: \[Informații extrase\]. Dacă răspunsul nu se află în aceste texte, specifică faptul că nu deții informația."*

4.  **Livrarea Răspunsului:** AI-ul formulează un răspuns coerent, impecabil din punct de vedere gramatical, dar fundamentat 100% pe literatura de specialitate furnizată.

## 4. Opțiuni de Implementare Tehnică

| Metodă de Implementare             | Descriere Tehnică                                                                                                                                                                                                    | Nivel de Complexitate                                   |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|
| **OpenAI Assistants API**          | Soluție de tip "Managed Service". Permite încărcarea documentelor direct în platforma OpenAI, care gestionează automat vectorizarea, stocarea și procesul de căutare (retrieval).                                    | Scăzut - Mediu (Ideal pentru prototipuri rapide)        |
| **Arhitectură Custom (LangChain)** | Utilizarea framework-ului LangChain în Node.js/Python combinat cu o bază de date vectorială independentă (ex: Pinecone). Oferă control absolut asupra algoritmilor de căutare și confidențialitate maximă a datelor. | Ridicat (Ideal pentru sisteme la scară largă/producție) |

## 5. Avantaje pentru Aplicația Propusă

- **Acuratețe garantată:** Utilizatorii primesc sfaturi validate științific, nu opinii generate statistic.

- **Actualizare ușoară:** Pentru a "învăța" AI-ul o nouă metodă de antrenament, este suficientă încărcarea unui nou document PDF în baza de date vectorială, fără a fi necesară re-antrenarea modelului.

- **Transparență:** Sistemul poate fi programat să citeze sursa exactă (documentul și pagina) de unde a extras informația pentru a formula răspunsul.
