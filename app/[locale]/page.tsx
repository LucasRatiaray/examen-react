"use client";

import { useState } from "react";
import { HeroWrapper } from "@/components/ui/hero-wrapper";
import { GlobePulse } from "@/components/ui/globe-pulse";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { OrbitGlyph } from "@/components/orbit-glyph";
import { DottedCard } from "@/components/ui/dotted-card";
import { useTranslations } from "next-intl";
import Image from "next/image";


export default function HomePage() {
  const t = useTranslations("Home");

  const [section, setSection] = useState<"launches" | "journal">("launches");
  const [speed, setSpeed] = useState(0.001);

  // Données dynamiques selon la langue
  const activeTitle = t(`sections.${section}.title`);
  const activeDescription = t(`sections.${section}.description`);
  // Pour les listes, on peut utiliser raw ou simplement mapper si on connaît les index
  // Ici on va tricher un peu en supposant 3 items comme dans le JSON
  const activeItems = [0, 1, 2].map(i => t(`sections.${section}.items.${i}`));

  return (
    <HeroWrapper>
      <header className="grid gap-10 pt-16 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <h1
            className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("title")}
          </h1>
          <p className="max-w-2xl text-base text-neutral-600 dark:text-white/60 md:text-lg">
            {t("description")}
          </p>
        </div>

        <DottedCard>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] opacity-60">
                {t("explorer")}
              </p>
              <h2 className="text-xl font-semibold tracking-tight">
                {activeTitle}
              </h2>
            </div>
            <OrbitGlyph />
          </div>

          <p className="text-sm leading-relaxed text-neutral-600 dark:text-white/60">
            {activeDescription}
          </p>

          <div className="flex gap-2">
            {(["launches", "journal"] as const).map((key) => (
              <Button
                key={key}
                variant={section === key ? "pill-active" : "pill"}
                className="flex-1"
                onClick={() => setSection(key)}
              >
                {t(`sections.${key}.label`)}
              </Button>
            ))}
          </div>

          <ul className="space-y-2 text-sm text-neutral-600 dark:text-white/60">
            {activeItems.map((item) => (
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
              src="spacex-launch.jpg"
              alt="SpaceX Falcon 9"
              fill
              unoptimized
              className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 ease-out"
            />
            <span className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/50 mix-blend-soft-light dark:from-white/10" />
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
            {t("launchSites")}
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
              {t("rotationSpeed")} : {Math.round(speed * 10000)}
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
