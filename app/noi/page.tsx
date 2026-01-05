import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Award, Leaf } from "lucide-react"

export default function NoiPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[350px] sm:h-[400px] overflow-hidden bg-primary/10">
        <div className="absolute inset-0">
          <img
            src="/traditional-mountain-house-calabria-village.jpg"
            alt="Casa tradizionale di montagna"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/50 to-background" />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Chi Siamo
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-foreground/90 text-balance px-2">
            Una storia di ospitalità autentica nel cuore della Calabria
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-foreground text-center">La Nostra Storia</h2>
          <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              Nel piccolo villaggio montano di <span className="font-semibold text-foreground">Castagna</span>, nel
              cuore della Calabria, nasce la Foresteria Il Cacciatore. La nostra struttura è il frutto di una passione
              per l'accoglienza e un profondo amore per queste terre meravigliose.
            </p>
            <p>
              Da generazioni, la nostra famiglia conosce ogni sentiero, ogni bosco e ogni angolo di questa magnifica
              regione. Abbiamo deciso di condividere questa conoscenza e questa bellezza con cacciatori, cercatori di
              funghi e tutti coloro che cercano un rifugio autentico tra le montagne.
            </p>
            <p>
              La nostra foresteria è stata pensata per offrire comfort e praticità, mantenendo vivo lo spirito di
              semplicità e calore che caratterizza l'ospitalità calabrese. Qui, ogni ospite diventa parte della nostra
              famiglia.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 sm:mb-12 text-center text-2xl sm:text-3xl font-bold text-foreground">I Nostri Valori</h2>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">Ospitalità</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Accoglienza calorosa e genuina, come nella migliore tradizione calabrese.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">Natura</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rispetto profondo per l'ambiente e le tradizioni locali del territorio.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">Comunità</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Creare legami autentici tra gli ospiti e il territorio di Castagna.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">Qualità</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Servizi curati nei dettagli per garantire un soggiorno indimenticabile.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Structure Details Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 sm:mb-12 text-center text-2xl sm:text-3xl font-bold text-foreground">
            La Nostra Struttura
          </h2>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <h3 className="mb-4 text-xl sm:text-2xl font-semibold text-foreground">Primo Piano</h3>
                <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">
                      Camere spaziose con letti a castello tripli, ideali per gruppi di cacciatori
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">Bagni completi e moderni per il massimo comfort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">
                      Cucina attrezzata con tutto il necessario per preparare pranzi e cene
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">Area comune per socializzare e condividere esperienze</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <h3 className="mb-4 text-xl sm:text-2xl font-semibold text-foreground">Secondo Piano</h3>
                <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">
                      Camere confortevoli con letti a castello tripli per famiglie e gruppi
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">Servizi igienici completi e sempre puliti</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">
                      Seconda cucina attrezzata per maggiore indipendenza degli ospiti
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">Spazi pensati per il relax dopo le escursioni</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-muted/30 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-foreground">La Posizione Perfetta</h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg text-muted-foreground leading-relaxed px-2">
            Castagna si trova nel cuore della Calabria, in una posizione strategica che permette di raggiungere
            facilmente la maestosa foresta della Sila. Il nostro villaggio montano è il punto di partenza ideale per
            esplorare i boschi ricchi di fauna selvatica e funghi pregiati.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-2">
            La zona è rinomata per le sue opportunità di caccia sostenibile e per la raccolta dei funghi porcini. In
            estate, il clima fresco e l'aria pulita della montagna offrono un rifugio perfetto dalla calura delle città.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
