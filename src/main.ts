// MILESTONE 1

// Definizione del tipo Person per rappresentare una persona generica
type Person = {

  readonly id: number;       // Identificativo univoco (non modificabile)
  readonly name: string;     // Nome completo della persona (non modificabile)
  birth_year: number;        // Anno di nascita (obbligatorio)
  death_year?: number;       // Anno di morte (opzionale, può mancare)
  biography: string;         // Breve biografia della persona
  image: string;             // URL dell'immagine della persona

};


// MILESTONE 2

// Insieme delle nazionalità accettate (union type)
type Nationality =
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese";

// Tipo Actress che estende Person e aggiunge nuove proprietà
type Actress = Person & {

  most_famous_movies: [string, string, string]; // Tupla di 3 stringhe (array con un numero fisso di elementi, dove ogni elemento ha un tipo specifico e una posizione precisa)
  awards: string;                               // Premi ricevuti (testo)
  nationality: Nationality;                     // Solo valori definiti

};


// MILESTONE 3

// Controlla se un oggetto ricevuto ha la struttura di Actress
function isActress(data: any): data is Actress {

  return (

    typeof data === "object" &&
    data !== null &&
    typeof data.id === "number" &&
    typeof data.name === "string" &&
    typeof data.birth_year === "number" &&
    (typeof data.death_year === "number" || data.death_year === undefined) &&
    typeof data.biography === "string" &&
    typeof data.image === "string" &&
    Array.isArray(data.most_famous_movies) &&
    data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every((movie: any) => typeof movie === "string") &&
    typeof data.awards === "string" &&
    [
      "American", "British", "Australian", "Israeli-American",
      "South African", "French", "Indian", "Israeli",
      "Spanish", "South Korean", "Chinese"
    ].includes(data.nationality)

  );

}

// Effettua una richiesta GET a /actresses/:id
// Se l'attrice esiste ed è valida, restituisce l'oggetto Actress
// Altrimenti restituisce null
async function getActress(id: number): Promise<Actress | null> {

  try {
    // Effettua la chiamata GET specificando l'id dell'attrice nella URL
    const response = await fetch(`http://localhost:3333/actresses/${id}`);

    // Controlla se la risposta HTTP è OK (es. status 200)
    // Se non lo è (es. 404 - non trovato), ritorna null
    if (!response.ok) {
      return null;
    }

    // Converte la risposta in formato JSON per poterla usare in JS/TS
    const data = await response.json();

    // Usa il type guard isActress per verificare che i dati rispettino la struttura attesa di Actress
    if (isActress(data)) {
      // Se i dati sono corretti, restituisce l'oggetto Actress
      return data;
    } else {
      // Se i dati ricevuti non corrispondono alla struttura di Actress, mostra un avviso in console
      console.warn("Dati ricevuti non validi:", data);
      return null;
    }
  } catch (error) {
    // Gestione degli errori di rete o fetch
    console.error("Errore nella chiamata:", error);
    // Ritorna null per indicare che la richiesta non è andata a buon fine
    return null;
  }

}

// Esempio di utilizzo della funzione getActress
// Chiama la funzione getActress con l'id 1 e gestisce la Promise con then()
getActress(1).then((actress) => {
  if (actress) {
    // Se l'attrice è stata trovata e i dati sono validi, stampa l'oggetto
    console.log("🎬 Attrice trovata:", actress);
  } else {
    // Se l'attrice non esiste o i dati non sono validi, stampa un messaggio di errore
    console.log("❌ Attrice non trovata o dati non validi.");
  }
});


// MILESTONE 4

// Recupera tutte le attrici dal server
// Ritorna un array di oggetti Actress validi (può essere anche vuoto)
async function getAllActresses(): Promise<Actress[]> {

  try {
    // Effettua la chiamata GET all'endpoint /actresses
    const response = await fetch(`http://localhost:3333/actresses`);

    // Controlla se la risposta HTTP è OK
    if (!response.ok) {
      // Se non OK, mostra un warning con il codice errore
      console.warn("Errore nella risposta del server:", response.status);
      // Ritorna un array vuoto perché la richiesta non ha avuto successo
      return [];
    }

    // Converte la risposta in formato JSON
    const data = await response.json();

    // Verifica che il dato ricevuto sia effettivamente un array
    if (!Array.isArray(data)) {
      // Se non è un array, mostra un warning con il dato ricevuto
      console.warn("Il server non ha restituito un array:", data);
      // Ritorna un array vuoto perché il formato non è quello atteso
      return [];
    }

    // Filtra l'array per mantenere solo gli oggetti che sono validi Actress
    // Il filtro usa il type guard isActress per controllare ogni elemento
    const actresses: Actress[] = data.filter(isActress);

    // Ritorna l'array di attrici valide
    return actresses;
  } catch (error) {
    // Se c'è un errore nella fetch o nella conversione JSON, lo stampa in console
    console.error("Errore durante la richiesta:", error);
    // Ritorna un array vuoto per garantire un ritorno sempre consistente
    return [];
  }
}

// Esempio di utilizzo di getAllActresses
// Chiama la funzione getAllActresses e gestisce la Promise con then()
getAllActresses().then((actresses) => {

  // Stampa quante attrici sono state trovate
  console.log(`🎞️ ${actresses.length} attrici trovate:`);
  // Per ogni attrice trovata stampa nome e nazionalità
  actresses.forEach((a) => {
    console.log(`- ${a.name} (${a.nationality})`);
  });

});