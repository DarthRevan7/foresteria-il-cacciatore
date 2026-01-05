"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_PRENOTAZIONI, type Prenotazione } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { Calendar, Users, Euro, Clock, Edit, Trash2, CreditCard } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function UserDashboardPage() {
  const { user } = useAuth()
  const [prenotazioni, setPrenotazioni] = useState(MOCK_PRENOTAZIONI.filter((p) => p.userId === user?.id))
  const [selectedPrenotazione, setSelectedPrenotazione] = useState<Prenotazione | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [editData, setEditData] = useState({
    checkIn: "",
    checkOut: "",
    numeroPersone: 0,
  })

  const handleModifica = (prenotazione: Prenotazione) => {
    setSelectedPrenotazione(prenotazione)
    setEditData({
      checkIn: prenotazione.checkIn,
      checkOut: prenotazione.checkOut,
      numeroPersone: prenotazione.numeroPersone,
    })
    setIsEditModalOpen(true)
  }

  const handleSalvaModifiche = () => {
    if (!selectedPrenotazione) return

    const prenotazioneAggiornata: Prenotazione = {
      ...selectedPrenotazione,
      checkIn: editData.checkIn,
      checkOut: editData.checkOut,
      numeroPersone: editData.numeroPersone,
      contatoreModifiche: (selectedPrenotazione.contatoreModifiche || 0) + 1,
    }

    setPrenotazioni(prenotazioni.map((p) => (p.id === selectedPrenotazione.id ? prenotazioneAggiornata : p)))
    setIsEditModalOpen(false)
    setSelectedPrenotazione(null)
  }

  const handleElimina = (id: string) => {
    if (confirm("Sei sicuro di voler eliminare questa prenotazione?")) {
      setPrenotazioni(prenotazioni.filter((p) => p.id !== id))
    }
  }

  const handlePagaAcconto = (prenotazione: Prenotazione) => {
    setSelectedPrenotazione(prenotazione)
    setIsPaymentModalOpen(true)
  }

  const handleConfermaPagamento = () => {
    if (!selectedPrenotazione) return

    const prenotazioneAggiornata: Prenotazione = {
      ...selectedPrenotazione,
      accontoVersato: true,
      status: "confermata",
    }

    setPrenotazioni(prenotazioni.map((p) => (p.id === selectedPrenotazione.id ? prenotazioneAggiornata : p)))
    setIsPaymentModalOpen(false)
    setSelectedPrenotazione(null)
    alert("Pagamento effettuato con successo! La tua prenotazione è ora confermata.")
  }

  const getStatusBadge = (status: Prenotazione["status"]) => {
    const badges = {
      in_attesa: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      contrattazione: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      confermata: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      rifiutata: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      completata: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    }
    const labels = {
      in_attesa: "In Attesa di Risposta",
      contrattazione: "In Contrattazione",
      confermata: "Confermata",
      rifiutata: "Rifiutata",
      completata: "Completata",
    }
    return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badges[status]}`}>{labels[status]}</span>
  }

  const prenotazioniAttive = prenotazioni.filter((p) => p.status !== "completata" && p.status !== "rifiutata")
  const prenotazioniPassate = prenotazioni.filter((p) => p.status === "completata" || p.status === "rifiutata")

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="min-h-screen bg-muted/30">
        <DashboardNav />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Le Mie Prenotazioni</h1>
            <p className="text-muted-foreground mt-1">Gestisci le tue prenotazioni alla Foresteria Il Cacciatore</p>
          </div>

          {prenotazioni.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Non hai ancora prenotazioni</p>
                <Link href="/prenota">
                  <Button>Prenota Ora</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Prenotazioni Attive */}
          {prenotazioniAttive.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Prenotazioni Attive</h2>
              <div className="space-y-4">
                {prenotazioniAttive.map((prenotazione) => (
                  <Card key={prenotazione.id} className="border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-foreground">Prenotazione #{prenotazione.id}</h3>
                            {getStatusBadge(prenotazione.status)}
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 shrink-0" />
                            <div>
                              <p className="font-medium text-foreground">Soggiorno</p>
                              <p>
                                {new Date(prenotazione.checkIn).toLocaleDateString("it-IT")} -{" "}
                                {new Date(prenotazione.checkOut).toLocaleDateString("it-IT")}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4 shrink-0" />
                            <div>
                              <p className="font-medium text-foreground">Persone</p>
                              <p>{prenotazione.numeroPersone} ospiti</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Euro className="h-4 w-4 shrink-0" />
                            <div>
                              <p className="font-medium text-foreground">Costo</p>
                              <p>€{prenotazione.totale}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 shrink-0" />
                            <div>
                              <p className="font-medium text-foreground">Richiesta</p>
                              <p>{new Date(prenotazione.dataRichiesta).toLocaleDateString("it-IT")}</p>
                            </div>
                          </div>
                        </div>

                        {prenotazione.messaggioAdmin && (
                          <div className="rounded-md bg-primary/10 p-3 border border-primary/20">
                            <p className="text-sm font-medium text-foreground mb-1">Messaggio dall'amministratore:</p>
                            <p className="text-sm text-muted-foreground">{prenotazione.messaggioAdmin}</p>
                          </div>
                        )}

                        {prenotazione.status === "contrattazione" && !prenotazione.accontoVersato && (
                          <div className="rounded-md bg-orange-50 dark:bg-orange-950/20 p-4 border border-orange-200 dark:border-orange-800">
                            <p className="text-sm font-medium text-orange-900 dark:text-orange-100 mb-2">
                              Azione richiesta: Pagamento acconto
                            </p>
                            <p className="text-sm text-orange-800 dark:text-orange-200 mb-3">
                              Devi pagare l'acconto del 30% (€{prenotazione.acconto}) entro il{" "}
                              {prenotazione.scadenzaPagamento &&
                                new Date(prenotazione.scadenzaPagamento).toLocaleDateString("it-IT")}{" "}
                              per confermare la prenotazione.
                            </p>
                            <Button
                              onClick={() => handlePagaAcconto(prenotazione)}
                              size="sm"
                              className="w-full sm:w-auto"
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Paga Acconto (€{prenotazione.acconto})
                            </Button>
                          </div>
                        )}

                        {prenotazione.status === "confermata" && prenotazione.accontoVersato && (
                          <div className="rounded-md bg-green-50 dark:bg-green-950/20 p-3 border border-green-200 dark:border-green-800">
                            <p className="text-sm text-green-800 dark:text-green-200">
                              ✓ Acconto versato. Prenotazione confermata! Ti aspettiamo il{" "}
                              {new Date(prenotazione.checkIn).toLocaleDateString("it-IT")}.
                            </p>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                          {prenotazione.status === "in_attesa" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleModifica(prenotazione)}
                                className="flex-1 sm:flex-none"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Modifica
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleElimina(prenotazione.id)}
                                className="flex-1 sm:flex-none text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Elimina
                              </Button>
                            </>
                          )}
                          {prenotazione.status === "confermata" && (
                            <p className="text-sm text-muted-foreground">
                              La prenotazione è confermata. Per modifiche contatta l'amministratore.
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Prenotazioni Passate */}
          {prenotazioniPassate.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">Storico</h2>
              <div className="space-y-4">
                {prenotazioniPassate.map((prenotazione) => (
                  <Card key={prenotazione.id} className="border-border opacity-75">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-foreground">Prenotazione #{prenotazione.id}</h3>
                          {getStatusBadge(prenotazione.status)}
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>
                              {new Date(prenotazione.checkIn).toLocaleDateString("it-IT")} -{" "}
                              {new Date(prenotazione.checkOut).toLocaleDateString("it-IT")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Euro className="h-4 w-4 shrink-0" />
                            <span>€{prenotazione.totale}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Modifica */}
        {isEditModalOpen && selectedPrenotazione && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-lg">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-xl font-semibold">Modifica Prenotazione</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="editCheckIn">Check-in</Label>
                    <Input
                      id="editCheckIn"
                      type="date"
                      value={editData.checkIn}
                      onChange={(e) => setEditData({ ...editData, checkIn: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editCheckOut">Check-out</Label>
                    <Input
                      id="editCheckOut"
                      type="date"
                      value={editData.checkOut}
                      onChange={(e) => setEditData({ ...editData, checkOut: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="editPersone">Numero Persone</Label>
                  <Input
                    id="editPersone"
                    type="number"
                    min="1"
                    max="9"
                    value={editData.numeroPersone}
                    onChange={(e) => setEditData({ ...editData, numeroPersone: Number.parseInt(e.target.value) })}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSalvaModifiche} className="flex-1">
                    Salva Modifiche
                  </Button>
                  <Button onClick={() => setIsEditModalOpen(false)} variant="outline">
                    Annulla
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal Pagamento */}
        {isPaymentModalOpen && selectedPrenotazione && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-lg">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-xl font-semibold">Pagamento Acconto</h3>

                <div className="rounded-md bg-muted p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Importo totale:</span>
                    <span className="font-medium">€{selectedPrenotazione.totale}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Acconto (30%):</span>
                    <span className="font-semibold text-primary text-lg">€{selectedPrenotazione.acconto}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Saldo all'arrivo:</span>
                    <span className="font-medium">€{selectedPrenotazione.totale - selectedPrenotazione.acconto}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Numero Carta</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Scadenza</Label>
                    <Input id="expiry" placeholder="MM/AA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" maxLength={3} />
                  </div>
                </div>

                <div className="rounded-md bg-blue-50 dark:bg-blue-950/20 p-3 border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    Questo è un pagamento simulato. Nessuna transazione reale verrà effettuata.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleConfermaPagamento} className="flex-1" size="lg">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Paga €{selectedPrenotazione.acconto}
                  </Button>
                  <Button onClick={() => setIsPaymentModalOpen(false)} variant="outline" size="lg">
                    Annulla
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
