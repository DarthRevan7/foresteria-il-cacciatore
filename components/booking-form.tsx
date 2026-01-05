"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Mail, Phone, User } from "lucide-react"

export function BookingForm() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    dataArrivo: "",
    dataPartenza: "",
    numeroPersone: "1",
    tipoSoggiorno: "condivisa",
    note: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        dataArrivo: "",
        dataPartenza: "",
        numeroPersone: "1",
        tipoSoggiorno: "condivisa",
        note: "",
      })
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
          <p className="text-muted-foreground">Ti contatteremo presto per confermare la tua prenotazione.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/20">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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
                <option value="condivisa">Camera Condivisa</option>
                <option value="gruppo">Gruppo (Intero Piano)</option>
                <option value="settimana">Settimana Completa</option>
              </select>
            </div>
          </div>

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

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Invio in corso..." : "Invia Richiesta di Prenotazione"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">Riceverai una conferma via email entro 24 ore</p>
        </form>
      </CardContent>
    </Card>
  )
}
