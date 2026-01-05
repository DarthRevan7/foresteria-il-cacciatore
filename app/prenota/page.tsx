import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BookingForm } from "@/components/booking-form"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PrenotaPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-primary/5 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Prenota il Tuo Soggiorno
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Compila il modulo per riservare le tue date presso la Foresteria Il Cacciatore
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Booking Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">Dettagli Prenotazione</h2>
              <BookingForm />
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">Cosa è Incluso</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground leading-relaxed">Camera con letti a castello tripli</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground leading-relaxed">
                        Accesso alla cucina completamente attrezzata
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground leading-relaxed">Bagno privato o condiviso</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground leading-relaxed">Parcheggio gratuito</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground leading-relaxed">
                        Informazioni su sentieri e zone di caccia
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground leading-relaxed">Wi-Fi nelle aree comuni</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-muted/30">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">Tariffe</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div>
                        <p className="font-medium text-foreground">Camera Condivisa</p>
                        <p className="text-sm text-muted-foreground">Per persona a notte</p>
                      </div>
                      <p className="text-xl font-bold text-primary">€25</p>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div>
                        <p className="font-medium text-foreground">Gruppo (6-9 persone)</p>
                        <p className="text-sm text-muted-foreground">Intero piano a notte</p>
                      </div>
                      <p className="text-xl font-bold text-primary">€180</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Settimana Completa</p>
                        <p className="text-sm text-muted-foreground">7 notti, per gruppo</p>
                      </div>
                      <p className="text-xl font-bold text-primary">€1.100</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">Informazioni Utili</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div>
                      <p className="font-medium text-foreground">Check-in:</p>
                      <p>Dalle 15:00</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Check-out:</p>
                      <p>Entro le 11:00</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Cancellazione:</p>
                      <p>Gratuita fino a 7 giorni prima dell'arrivo</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Caparra:</p>
                      <p>30% del totale richiesto alla prenotazione</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
