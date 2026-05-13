import "@/app/globals.css"
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { OrbitGlyph } from "@/components/orbit-glyph";
import { DottedCard } from "@/components/ui/dotted-card";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function LocaleNotFound() {
  const t = useTranslations("Errors");

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 bg-black text-white overflow-hidden">
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
          {t("notFoundDesc")}
        </p>
        <Button asChild className="h-10 px-6 cursor-pointer rounded-full">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("backHome")}
          </Link>
        </Button>
      </DottedCard>
    </div>
  )
}
