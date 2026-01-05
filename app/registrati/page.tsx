import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/register-form"
import Link from "next/link"

export default function RegistratiPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Registrati</h1>
            <p className="text-muted-foreground">Crea il tuo account per prenotare più velocemente</p>
          </div>

          <RegisterForm />

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Hai già un account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Accedi qui
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
