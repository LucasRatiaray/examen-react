"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { GlobePulse } from "@/components/ui/globe-pulse";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from 'lucide-react';

const STYLE_ID = "birdmachine-hero-animations";

const KEYFRAMES = `
  @keyframes birdmachine-intro {
    0%   { opacity: 0; transform: translate3d(0,64px,0) scale(0.98); filter: blur(12px); }
    60%  { filter: blur(0); }
    100% { opacity: 1; transform: translate3d(0,0,0) scale(1); filter: blur(0); }
  }
  @keyframes birdmachine-orbit {
    0%   { stroke-dashoffset: 0;   transform: rotate(0deg);   transform-origin: 60px 60px; }
    100% { stroke-dashoffset: -64; transform: rotate(360deg); transform-origin: 60px 60px; }
  }
  @keyframes birdmachine-grid {
    0%, 100% { transform: rotate(-2deg); opacity: 0.7; }
    50%       { transform: rotate(2deg);  opacity: 1;   }
  }
  @keyframes birdmachine-pulse {
    0%, 100%  { stroke-dasharray: 0   200; opacity: 0.2; }
    45%, 60%  { stroke-dasharray: 200 0;   opacity: 1;   }
  }
  @keyframes birdmachine-glow {
    0%, 100% { opacity: 0.45; transform: translate3d(0,0,0);   }
    50%       { opacity: 0.9;  transform: translate3d(0,-8px,0); }
  }
  @keyframes birdmachine-drift {
    0%, 100% { transform: translate3d(0,0,0)    rotate(-3deg); }
    50%       { transform: translate3d(0,-12px,0) rotate(3deg);  }
  }
`;

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


const OrbitGlyph = () => (
  <svg viewBox="0 0 120 120" className="h-16 w-16 shrink-0" aria-hidden>
    <circle
      cx="60" cy="60" r="46"
      fill="none" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.7"
      style={{ strokeDasharray: "18 14" }}
      className="motion-safe:animate-[birdmachine-orbit_8.5s_linear_infinite] motion-reduce:animate-none"
    />
    <rect
      x="34" y="34" width="52" height="52" rx="14"
      fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7"
      className="motion-safe:animate-[birdmachine-grid_5.4s_ease-in-out_infinite] motion-reduce:animate-none"
    />
    <circle cx="60" cy="60" r="7" fill="currentColor" />
    <path
      d="M60 30v10M60 80v10M30 60h10M80 60h10"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7"
      className="motion-safe:animate-[birdmachine-pulse_6s_ease-in-out_infinite] motion-reduce:animate-none"
    />
  </svg>
);

export function HeroBirdmachine() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const [section, setSection] = useState<keyof typeof SECTIONS>("launches");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Injection des keyframes
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = Object.assign(document.createElement("style"), {
      id: STYLE_ID,
      textContent: KEYFRAMES,
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  // Animation d'entrée via IntersectionObserver
  useEffect(() => {
    if (!sectionRef.current) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Variables inline uniquement pour les gradients CSS (non exprimables en Tailwind)
  const bgColor = isDark ? "#040404" : "#f5f5f4";
  const bgGradient = isDark
    ? "radial-gradient(ellipse 80% 60% at 10% -10%, rgba(255,255,255,0.15), transparent 60%), radial-gradient(ellipse 90% 70% at 90% -20%, rgba(120,120,120,0.12), transparent 70%)"
    : "radial-gradient(ellipse 80% 60% at 10% -10%, rgba(15,15,15,0.12), transparent 60%), radial-gradient(ellipse 90% 70% at 90% -20%, rgba(15,15,15,0.08), transparent 70%)";
  const topGlow = isDark
    ? "radial-gradient(60% 50% at 50% 10%, rgba(255,255,255,0.18), transparent 70%)"
    : "radial-gradient(60% 50% at 50% 10%, rgba(17,17,17,0.12), transparent 70%)";
  const dots = isDark
    ? "radial-gradient(circle at 25% 25%, rgba(250,250,250,0.08) 0.7px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(250,250,250,0.08) 0.7px, transparent 1px)"
    : "radial-gradient(circle at 25% 25%, rgba(17,17,17,0.12) 0.7px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(17,17,17,0.08) 0.7px, transparent 1px)";

  const active = SECTIONS[section];

  const [speed, setSpeed] = useState(0.001);

  return (
    <div className="relative isolate min-h-screen w-full bg-white text-neutral-950 transition-colors duration-700 dark:bg-black dark:text-white">

      {/* Fond : couleur + blobs */}
      <div className="pointer-events-none absolute inset-0 -z-30"
        style={{ backgroundColor: bgColor, backgroundImage: bgGradient, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      />
      {/* Halo diffus en haut */}
      <div className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: topGlow, filter: "blur(22px)" }}
      />

      <section
        ref={sectionRef}
        className={`relative flex min-h-screen w-full flex-col gap-16 px-6 py-24 transition-opacity duration-700 md:gap-20 md:px-10 lg:px-16 xl:px-24 ${visible ? "motion-safe:animate-[birdmachine-intro_1s_cubic-bezier(.22,.68,0,1)_forwards]" : "opacity-0"
          }`}
      >
        {/* En-tête : titre | carte */}
        <header className="grid gap-10 pt-16 lg:grid-cols-2 lg:items-start">

          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
              BirdMachine — chaque lancement, chaque moment.
            </h1>
            <p className="max-w-2xl text-base text-neutral-600 dark:text-white/60 md:text-lg">
              Suivez les prochaines missions spatiales en temps réel et tenez votre journal de bord personnel. SpaceX, NASA, ESA et plus — tout en un seul endroit.
            </p>
          </div>

          {/* Carte section */}
          <div
            className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-100/80 p-8 transition dark:border-white/12 dark:bg-white/6"
            style={{ backgroundImage: dots, backgroundSize: "12px 12px", backgroundRepeat: "repeat" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] opacity-60">Explorer</p>
                <h2 className="text-xl font-semibold tracking-tight">{active.title}</h2>
              </div>
              <OrbitGlyph />
            </div>

            <p className="text-sm leading-relaxed text-neutral-600 dark:text-white/60">
              {active.description}
            </p>

            {/* Onglets */}
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
          </div>
        </header>

        {/* Grille basse : image | globe */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">

          <figure className="overflow-hidden rounded-[32px] border border-neutral-200/80 transition dark:border-white/12">
            <div className="relative w-full pb-[120%] sm:pb-[90%] lg:pb-[72%]">
              <img
                src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&q=80"
                alt="Fusée SpaceX Falcon 9 au décollage"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 ease-out"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 mix-blend-soft-light dark:from-white/10" />
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
            <p className="text-lg uppercase tracking-[0.35em] opacity-60">Sites de lancements</p>
            <GlobePulse className="w-full max-w-lg" speed={speed} />
            <div className="flex items-center justify-center gap-4">
              <Button variant="pill" onClick={() => setSpeed(prev => Math.max(-0.008, prev - 0.001))}><Minus /></Button>
              <span className="text-sm uppercase tracking-[0.35em] opacity-60">Vitesse de rotation : {Math.round(speed * 10000)} </span>
              <Button variant="pill" onClick={() => setSpeed(prev => Math.min(0.008, prev + 0.001))}><Plus /></Button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
