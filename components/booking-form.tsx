"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Mail, Phone, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export function BookingForm() {
  const { user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    nome: user?.nome || "",
    cognome: user?.cognome || "",
    email: user?.email || "",
    telefono: "",
    dataArrivo: "",
    dataPartenza: "",
    numeroPersone: "1",
    piano: "primo",
    tipoSoggiorno: "condivisa",
    note: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateTotale = () => {
    const giorni =
      formData.dataArrivo && formData.dataPartenza
        ? Math.ceil(
            (new Date(formData.dataPartenza).getTime() - new Date(formData.dataArrivo).getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : 0

    if (formData.tipoSoggiorno === "settimana") {
      return 1100
    } else if (formData.tipoSoggiorno === "gruppo") {
      return giorni * 180
    } else {
      return giorni * 25 * Number.parseInt(formData.numeroPersone)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert("Devi effettuare il login per prenotare. Ti reindirizzeremo alla pagina di login.")
      router.push("/login")
      return
    }

    setIsSubmitting(true)

    // Simulate API call - qui verrebbe creata la prenotazione nel database
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after 3 seconds and redirect to dashboard
    setTimeout(() => {
      setIsSubmitted(false)
      router.push("/dashboard/user")
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <Card className="border-primary/40 bg-primary/5">
        <CardContent className="py-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-foreground">Richiesta Inviata!</h3>
          <p className="text-muted-foreground mb-4">La tua richiesta di prenotazione è stata inviata con successo.</p>
          <p className="text-sm text-muted-foreground">Ti reindirizzeremo al tuo pannello utente...</p>
        </CardContent>
      </Card>
    )
  }

  const totale = calculateTotale()
  const acconto = Math.round(totale * 0.3)

  return (
    <Card className="border-primary/20">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {!user && (
            <div className="rounded-md bg-blue-50 dark:bg-blue-950/20 p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Devi essere loggato per effettuare una prenotazione.{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="font-medium underline hover:no-underline"
                >
                  Accedi ora
                </button>
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-foreground">
                Nome *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Mario"
                  disabled={!!user}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cognome" className="text-foreground">
                Cognome *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="cognome"
                  name="cognome"
                  type="text"
                  required
                  value={formData.cognome}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Rossi"
                  disabled={!!user}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                placeholder="mario.rossi@example.com"
                disabled={!!user}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono" className="text-foreground">
              Telefono *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                required
                value={formData.telefono}
                onChange={handleChange}
                className="pl-10"
                placeholder="+39 123 456 7890"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dataArrivo" className="text-foreground">
                Data Arrivo *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="dataArrivo"
                  name="dataArrivo"
                  type="date"
                  required
                  value={formData.dataArrivo}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataPartenza" className="text-foreground">
                Data Partenza *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="dataPartenza"
                  name="dataPartenza"
                  type="date"
                  required
                  value={formData.dataPartenza}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="numeroPersone" className="text-foreground">
                Numero Persone *
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="numeroPersone"
                  name="numeroPersone"
                  type="number"
                  min="1"
                  max="18"
                  required
                  value={formData.numeroPersone}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="piano" className="text-foreground">
                Piano Preferito *
              </Label>
              <select
                id="piano"
                name="piano"
                required
                value={formData.piano}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="primo">Primo Piano</option>
                <option value="secondo">Secondo Piano</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipoSoggiorno" className="text-foreground">
              Tipo Soggiorno *
            </Label>
            <select
              id="tipoSoggiorno"
              name="tipoSoggiorno"
              required
              value={formData.tipoSoggiorno}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="condivisa">Camera Condivisa (€25/persona/notte)</option>
              <option value="gruppo">Gruppo - Intero Piano (€180/notte)</option>
              <option value="settimana">Settimana Completa (€1.100)</option>
            </select>
          </div>

          {totale > 0 && (
            <div className="rounded-md bg-muted p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Totale stimato:</span>
                <span className="font-semibold text-foreground">€{totale}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Acconto richiesto (30%):</span>
                <span className="font-semibold text-primary">€{acconto}</span>
              </div>
              <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                Dopo la conferma dell'admin, avrai 2 giorni per versare l'acconto
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="note" className="text-foreground">
              Note Aggiuntive
            </Label>
            <Textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Hai richieste particolari? Faccelo sapere..."
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || !user}>
            {isSubmitting ? "Invio in corso..." : "Invia Richiesta di Prenotazione"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            L'amministratore risponderà alla tua richiesta entro 24 ore
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
