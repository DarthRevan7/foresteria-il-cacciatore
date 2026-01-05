import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Trees, Home, Utensils, Bed, MapPin, Mountain } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden bg-primary/10">
        <div className="absolute inset-0">
          <img
            src="/scenic-mountain-landscape-calabria-sila-forest-sun.jpg"
            alt="Paesaggio montano della Sila"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-background" />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Foresteria <span className="text-primary">Il Cacciatore</span>
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-foreground/90 leading-relaxed text-balance">
            La tua casa nel cuore della Calabria. Accoglienza autentica per cacciatori, cercatori di funghi e amanti
            della montagna.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/prenota">
              <Button size="lg" className="text-lg px-8">
                Prenota Ora
              </Button>
            </Link>
            <Link href="/noi">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Scopri di Più
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl">Benvenuti a Castagna</h2>
          <p className="mb-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
            Nel cuore della Calabria, a pochi passi dalla magnifica foresta della Sila
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-primary/20 transition-all hover:border-primary/40 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Camere Confortevoli</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Due piani con camere dotate di letti a castello tripli, perfetti per gruppi e famiglie.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 transition-all hover:border-primary/40 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Cucine Complete</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Una cucina per piano, completamente attrezzata per preparare i tuoi pasti dopo una giornata
                  all'aperto.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 transition-all hover:border-primary/40 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Posizione Strategica</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Situati al centro della Calabria, punto di partenza ideale per esplorare la Sila.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="bg-muted/30 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground sm:text-4xl">Attività nella Zona</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm border border-border">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Trees className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Caccia</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Territorio ricco di fauna selvatica, ideale per gli appassionati di caccia. Rispettando sempre le
                  normative locali.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm border border-border">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Mountain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Raccolta Funghi</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Boschi della Sila famosi per l'abbondanza di funghi porcini e altre varietà pregiate.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm border border-border">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Bed className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Relax Estivo</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Clima fresco e piacevole in estate, perfetto per sfuggire al caldo e godersi la natura.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm border border-border">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Escursioni</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sentieri panoramici e percorsi naturalistici nella splendida cornice del Parco Nazionale della Sila.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Pronto per la Tua Avventura?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground text-balance">
            Prenota il tuo soggiorno presso la Foresteria Il Cacciatore e scopri l'autentica ospitalità calabrese.
          </p>
          <Link href="/prenota">
            <Button size="lg" className="text-lg px-8">
              Prenota il Tuo Soggiorno
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
