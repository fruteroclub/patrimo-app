'use client'

import Link from 'next/link'
import PatrimoScene from '@/components/PatrimoScene'

export default function Landing() {
  return (
    <>
      <PatrimoScene />
      <section className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-6 text-center">
        <div className="max-w-3xl space-y-10">
          <h1 className="text-5xl font-funnel font-medium tracking-tight !leading-[1.2]">
            Tu asesor patrimonial <br className="hidden md:block" />
            <span className="underline decoration-primary underline-offset-8">
              on-chain
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground">
            Invierte con estrategia en el mundo cripto.
          </p>
          <p className="text-base md:text-lg text-muted-foreground">
            Tú mantienes el control de tus activos. Nosotros te guiamos.
          </p>

          <div className="mt-10">
            <Link href="/explore">
              <button className="bg-primary text-primary-foreground hover:bg-primary/80 px-8 py-3 text-xl font-semibold rounded-lg transition-all">
                Conoce cómo funciona
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
