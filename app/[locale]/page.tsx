"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { HeroWrapper } from "@/components/ui/hero-wrapper";
import { GlobePulse } from "@/components/ui/globe-pulse";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { OrbitGlyph } from "@/components/orbit-glyph";
import { DottedCard } from "@/components/ui/dotted-card";
import Image from "next/image";

const SECTIONS = {
  launches: {
    title: "Prochains lancements",
    description:
      "Consultez les prochaines missions en temps réel : SpaceX, NASA, Roscosmos et plus. Chaque lancement présenté avec sa fenêtre de tir, sa fusée et son site de lancement.",
    items: [
      "Données issues de The Space Devs API",
      "Fenêtres de lancement en temps réel",
      "Filtrage par agence et statut",
    ],
  },
  journal: {
    title: "Journal de bord",
    description:
      "Documentez vos observations mission par mission. Rédigez des entrées libres, associez-les à un lancement et retrouvez-les dans votre historique personnel.",
    items: [
      "Sauvegarde locale (localStorage)",
      "Association à un lancement précis",
      "Historique chronologique",
    ],
  },
} as const;

export default function HomePage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const [section, setSection] = useState<keyof typeof SECTIONS>("launches");
  const active = SECTIONS[section];
  const [speed, setSpeed] = useState(0.001);

  return (
    <HeroWrapper>
      <header className="grid gap-10 pt-16 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <h1
            className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            BirdMachine — chaque lancement, chaque moment.
          </h1>
          <p className="max-w-2xl text-base text-neutral-600 dark:text-white/60 md:text-lg">
            Suivez les prochaines missions spatiales en temps réel et tenez
            votre journal de bord personnel. SpaceX, NASA, ESA et plus — tout en
            un seul endroit.
          </p>
        </div>

        <DottedCard>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] opacity-60">
                Explorer
              </p>
              <h2 className="text-xl font-semibold tracking-tight">
                {active.title}
              </h2>
            </div>
            <OrbitGlyph />
          </div>

          <p className="text-sm leading-relaxed text-neutral-600 dark:text-white/60">
            {active.description}
          </p>

          <div className="flex gap-2">
            {(["launches", "journal"] as const).map((key) => (
              <Button
                key={key}
                variant={section === key ? "pill-active" : "pill"}
                className="flex-1"
                onClick={() => setSection(key)}
              >
                {key === "launches" ? "Lancements" : "Journal"}
              </Button>
            ))}
          </div>

          <ul className="space-y-2 text-sm text-neutral-600 dark:text-white/60">
            {active.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-current" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </DottedCard>
      </header>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
        <figure className="overflow-hidden rounded-[32px] border border-neutral-200/80 transition dark:border-white/12">
          <div className="relative w-full pb-[120%] sm:pb-[90%] lg:pb-[72%]">
            <Image
              src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&q=80"
              alt="Fusée SpaceX Falcon 9 au décollage"
              fill
              unoptimized
              className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 ease-out"
            />
            <span className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/50 mix-blend-soft-light dark:from-white/10" />
            <span className="pointer-events-none absolute -left-16 top-16 h-40 w-40 rounded-full border border-white/15 opacity-70 motion-safe:animate-[birdmachine-glow_9s_ease-in-out_infinite]" />
            <span className="pointer-events-none absolute -right-12 bottom-16 h-48 w-48 rounded-full border border-white/10 opacity-40 motion-safe:animate-[birdmachine-drift_12s_ease-in-out_infinite]" />
          </div>
          <figcaption className="flex items-center justify-between px-6 py-5 text-xs uppercase tracking-[0.35em] text-neutral-600 dark:text-white/60">
            <span>Falcon 9 — Cape Canaveral</span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-8 bg-current" />
              SpaceX
            </span>
          </figcaption>
        </figure>

        <div className="flex flex-col items-center justify-center">
          <p className="text-lg uppercase tracking-[0.35em] opacity-60">
            Sites de lancements
          </p>
          <GlobePulse className="w-full max-w-lg" speed={speed} />
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="pill"
              onClick={() => setSpeed((prev) => Math.max(-0.008, prev - 0.001))}
            >
              <Minus />
            </Button>
            <span className="text-sm uppercase tracking-[0.35em] opacity-60">
              Vitesse de rotation : {Math.round(speed * 10000)}
            </span>
            <Button
              variant="pill"
              onClick={() => setSpeed((prev) => Math.min(0.008, prev + 0.001))}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>
    </HeroWrapper>
  );
}
