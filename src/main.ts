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

