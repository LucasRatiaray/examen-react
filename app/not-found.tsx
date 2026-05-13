import "@/app/globals.css"
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { OrbitGlyph } from "@/components/orbit-glyph";
import { DottedCard } from "@/components/ui/dotted-card";
import { Metadata } from "next";
import Link from "next/link";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "404",
  description: "Page non trouvée",
}

export default function RootNotFound() {
  return (
    <html lang="fr" className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} dark`}>
      <body className="relative bg-black text-white flex min-h-screen items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/blackhole.png"
            alt="Cinematic Black Hole"
            fill
            priority
            className="object-cover opacity-50 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>

        <DottedCard className="relative z-10 max-w-md w-full flex flex-col items-center text-center p-12 backdrop-blur-sm bg-black/20 border-white/10 shadow-2xl">
          <div className="mb-6 text-neutral-500 dark:text-neutral-400">
            <OrbitGlyph />
          </div>
          <h1 className="mb-2 text-5xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
            404
          </h1>
          <p className="mb-8 text-neutral-400">
            Cette orbite est vide. La page que vous cherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Button asChild className="h-10 px-6 cursor-pointer rounded-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la base
            </Link>
          </Button>
        </DottedCard>
      </body>
    </html>
  )
}
