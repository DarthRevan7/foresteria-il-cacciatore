import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Accedi</h1>
            <p className="text-muted-foreground">Gestisci le tue prenotazioni e il tuo profilo</p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Non hai un account?{" "}
              <Link href="/registrati" className="font-medium text-primary hover:underline">
                Registrati qui
              </Link>
            </p>
          </div>

          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Hai bisogno di aiuto?{" "}
              <Link href="/" className="text-primary hover:underline">
                Contattaci
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
