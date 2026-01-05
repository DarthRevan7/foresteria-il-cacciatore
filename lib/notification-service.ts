import type { Notifica, Prenotazione } from "./mock-data"

export class NotificationService {
  static creaNotificaConferma(prenotazione: Prenotazione): Notifica {
    return {
      id: Date.now().toString(),
      userId: prenotazione.userId,
      tipo: "prenotazione_confermata",
      titolo: "Prenotazione Confermata!",
      messaggio: `La tua prenotazione per il ${new Date(prenotazione.checkIn).toLocaleDateString("it-IT")} è stata confermata. Ti aspettiamo!`,
      data: new Date().toISOString(),
      letta: false,
      prenotazioneId: prenotazione.id,
    }
  }

  static creaNotificaRifiuto(prenotazione: Prenotazione): Notifica {
    return {
      id: Date.now().toString(),
      userId: prenotazione.userId,
      tipo: "prenotazione_rifiutata",
      titolo: "Prenotazione Rifiutata",
      messaggio:
        prenotazione.messaggioAdmin ||
        "Spiacenti, non possiamo accettare la tua prenotazione per il periodo richiesto.",
      data: new Date().toISOString(),
      letta: false,
      prenotazioneId: prenotazione.id,
    }
  }

  static creaNotificaContrattazione(prenotazione: Prenotazione): Notifica {
    const giorniScadenza = prenotazione.scadenzaPagamento
      ? Math.ceil((new Date(prenotazione.scadenzaPagamento).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : 2

    return {
      id: Date.now().toString(),
      userId: prenotazione.userId,
      tipo: "nuova_proposta",
      titolo: "Risposta alla Richiesta di Prenotazione",
      messaggio: `L'amministratore ha confermato la disponibilità. Hai ${giorniScadenza} giorni per versare l'acconto del 30% (€${prenotazione.acconto}).`,
      data: new Date().toISOString(),
      letta: false,
      prenotazioneId: prenotazione.id,
    }
  }

  static creaNotificaScadenzaPagamento(prenotazione: Prenotazione): Notifica {
    return {
      id: Date.now().toString(),
      userId: prenotazione.userId,
      tipo: "scadenza_pagamento",
      titolo: "Scadenza Pagamento Imminente",
      messaggio: `Il termine per il pagamento dell'acconto per la prenotazione del ${new Date(prenotazione.checkIn).toLocaleDateString("it-IT")} sta per scadere. Paga entro il ${prenotazione.scadenzaPagamento ? new Date(prenotazione.scadenzaPagamento).toLocaleDateString("it-IT") : "termine"}.`,
      data: new Date().toISOString(),
      letta: false,
      prenotazioneId: prenotazione.id,
    }
  }

  static creaNotificaPagamentoRicevuto(prenotazione: Prenotazione): Notifica {
    return {
      id: Date.now().toString(),
      userId: prenotazione.userId,
      tipo: "pagamento_ricevuto",
      titolo: "Pagamento Ricevuto",
      messaggio: `Abbiamo ricevuto il tuo acconto di €${prenotazione.acconto}. La prenotazione è ora confermata!`,
      data: new Date().toISOString(),
      letta: false,
      prenotazioneId: prenotazione.id,
    }
  }
}
