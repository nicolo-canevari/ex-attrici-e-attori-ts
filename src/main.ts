// Definizione del tipo Person per rappresentare una persona generica
type Person = {

  readonly id: number;       // Identificativo univoco (non modificabile)
  readonly name: string;     // Nome completo della persona (non modificabile)
  birth_year: number;        // Anno di nascita (obbligatorio)
  death_year?: number;       // Anno di morte (opzionale, può mancare)
  biography: string;         // Breve biografia della persona
  image: string;             // URL dell'immagine della persona

};
