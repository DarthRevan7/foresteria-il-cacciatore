export interface Prenotazione {
  id: string
  userId: string
  userName: string
  userEmail: string
  checkIn: string
  checkOut: string
  numeroPersone: number
  piano: "primo" | "secondo"
  tipo: "camera" | "gruppo" | "settimana"
  totale: number
  acconto: number
  accontoVersato: boolean
  status: "in_attesa" | "contrattazione" | "confermata" | "rifiutata" | "completata"
  note?: string
  dataRichiesta: string
  scadenzaPagamento?: string
  messaggioAdmin?: string
  contatoreModifiche?: number
}

export interface Reminder {
  id: string
  titolo: string
  descrizione: string
  data: string
  tipo: "pulizia" | "accoglienza" | "manutenzione" | "altro"
  completato: boolean
  priorita: "bassa" | "media" | "alta"
}

export interface Notifica {
  id: string
  userId: string
  tipo:
    | "prenotazione_confermata"
    | "prenotazione_rifiutata"
    | "nuova_proposta"
    | "scadenza_pagamento"
    | "pagamento_ricevuto"
  titolo: string
  messaggio: string
  data: string
  letta: boolean
  prenotazioneId?: string
}

export interface StatisticheAdmin {
  incassoMensile: number
  numeroOspiti: number
  prenotazioniAttive: number
  occupazionePercentuale: number
}

// Mock prenotazioni
export const MOCK_PRENOTAZIONI: Prenotazione[] = [
  {
    id: "1",
    userId: "2",
    userName: "Giuseppe Verdi",
    userEmail: "user@foresteria.it",
    checkIn: "2026-02-15",
    checkOut: "2026-02-22",
    numeroPersone: 4,
    piano: "primo",
    tipo: "settimana",
    totale: 1100,
    acconto: 330,
    accontoVersato: true,
    status: "confermata",
    note: "Arrivo previsto nel pomeriggio",
    dataRichiesta: "2026-01-20T10:30:00",
    messaggioAdmin: "Prenotazione confermata! Vi aspettiamo.",
  },
  {
    id: "2",
    userId: "3",
    userName: "Marco Bianchi",
    userEmail: "marco.bianchi@email.it",
    checkIn: "2026-02-10",
    checkOut: "2026-02-12",
    numeroPersone: 8,
    piano: "secondo",
    tipo: "gruppo",
    totale: 360,
    acconto: 108,
    accontoVersato: false,
    status: "contrattazione",
    dataRichiesta: "2026-01-25T14:20:00",
    scadenzaPagamento: "2026-01-27T14:20:00",
    messaggioAdmin: "Confermo disponibilità per queste date. Hai 2 giorni per versare l'acconto.",
  },
  {
    id: "3",
    userId: "4",
    userName: "Luca Ferrari",
    userEmail: "luca.ferrari@email.it",
    checkIn: "2026-03-01",
    checkOut: "2026-03-05",
    numeroPersone: 6,
    piano: "primo",
    tipo: "gruppo",
    totale: 720,
    acconto: 216,
    accontoVersato: false,
    status: "in_attesa",
    note: "Gruppo di cacciatori, arrivo al mattino",
    dataRichiesta: "2026-01-26T09:15:00",
  },
]

// Mock reminder
export const MOCK_REMINDERS: Reminder[] = [
  {
    id: "1",
    titolo: "Pulizia Primo Piano",
    descrizione: "Preparare il primo piano per l'arrivo di Giuseppe Verdi",
    data: "2026-02-14",
    tipo: "pulizia",
    completato: false,
    priorita: "alta",
  },
  {
    id: "2",
    titolo: "Accoglienza Nuovi Ospiti",
    descrizione: "Giuseppe Verdi - Arrivo previsto ore 15:00",
    data: "2026-02-15",
    tipo: "accoglienza",
    completato: false,
    priorita: "alta",
  },
  {
    id: "3",
    titolo: "Chiamare Signora Pulizie",
    descrizione: "Organizzare pulizie settimanali per febbraio",
    data: "2026-02-05",
    tipo: "pulizia",
    completato: false,
    priorita: "media",
  },
  {
    id: "4",
    titolo: "Controllo Caldaia",
    descrizione: "Manutenzione ordinaria caldaia secondo piano",
    data: "2026-02-08",
    tipo: "manutenzione",
    completato: false,
    priorita: "media",
  },
]

// Mock notifiche
export const MOCK_NOTIFICHE: Notifica[] = [
  {
    id: "1",
    userId: "2",
    tipo: "prenotazione_confermata",
    titolo: "Prenotazione Confermata",
    messaggio: "La tua prenotazione per il 15-22 febbraio è stata confermata!",
    data: "2026-01-21T10:00:00",
    letta: false,
    prenotazioneId: "1",
  },
  {
    id: "2",
    userId: "3",
    tipo: "nuova_proposta",
    titolo: "Risposta alla Richiesta",
    messaggio: "L'admin ha confermato la disponibilità. Hai 2 giorni per versare l'acconto del 30%.",
    data: "2026-01-25T15:00:00",
    letta: false,
    prenotazioneId: "2",
  },
]

// Mock statistiche
export const MOCK_STATISTICHE: StatisticheAdmin = {
  incassoMensile: 2580,
  numeroOspiti: 18,
  prenotazioniAttive: 3,
  occupazionePercentuale: 65,
}
