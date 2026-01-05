import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">Foresteria Il Cacciatore</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La tua casa tra le montagne della Calabria. Accoglienza calorosa per cacciatori, cercatori di funghi e
              amanti della natura.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Link Rapidi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/noi" className="text-muted-foreground transition-colors hover:text-primary">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link href="/prenota" className="text-muted-foreground transition-colors hover:text-primary">
                  Prenota Ora
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Contatti</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>Castagna, Calabria - Vicino alla Sila</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+39 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>info@ilcacciatore.it</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Foresteria Il Cacciatore. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}
