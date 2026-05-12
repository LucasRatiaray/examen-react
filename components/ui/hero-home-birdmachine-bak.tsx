'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";

const STYLE_ID = "birdmachine-hero-animations";

const getRootTheme = () => {
  if (typeof document === "undefined") return "dark";
  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.classList.contains("light")) return "light";
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "dark";
};

const useThemeSync = () => {
  const [theme, setTheme] = useState(() => getRootTheme());

  useEffect(() => {
    if (typeof document === "undefined") return;

    const sync = () => {
      const next = getRootTheme();
      setTheme((prev) => (prev === next ? prev : next));
    };

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const media =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;
    media?.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      media?.removeEventListener("change", sync);
    };
  }, []);

  return theme;
};

const OrbitGlyph = ({ theme = "dark" }) => {
  const stroke = theme === "dark" ? "#f5f5f5" : "#111111";
  const fill = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(17,17,17,0.08)";
  return (
    <svg viewBox="0 0 120 120" className="h-16 w-16" aria-hidden>
      <circle
        cx="60" cy="60" r="46"
        fill="none" stroke={stroke} strokeWidth="1.4"
        style={{ strokeDasharray: "18 14" }}
        className="motion-safe:animate-[birdmachine-orbit_8.5s_linear_infinite] motion-reduce:animate-none"
      />
      <rect x="34" y="34" width="52" height="52" rx="14"
        fill={fill} stroke={stroke} strokeWidth="1.2"
        className="motion-safe:animate-[birdmachine-grid_5.4s_ease-in-out_infinite] motion-reduce:animate-none"
      />
      <circle cx="60" cy="60" r="7" fill={stroke} />
      <path d="M60 30v10M60 80v10M30 60h10M80 60h10"
        stroke={stroke} strokeWidth="1.4" strokeLinecap="round"
        className="motion-safe:animate-[birdmachine-pulse_6s_ease-in-out_infinite] motion-reduce:animate-none"
      />
    </svg>
  );
};

export function HeroLaunchDeck() {
  const theme = useThemeSync();
  const [visible, setVisible] = useState(false);
  const [section, setSection] = useState<"launches" | "journal">("launches");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.innerHTML = `
      @keyframes birdmachine-intro {
        0% { opacity: 0; transform: translate3d(0, 64px, 0) scale(0.98); filter: blur(12px); }
        60% { filter: blur(0); }
        100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0); }
      }
      @keyframes birdmachine-orbit {
        0% { stroke-dashoffset: 0; transform: rotate(0deg); transform-origin: 60px 60px; }
        100% { stroke-dashoffset: -64; transform: rotate(360deg); transform-origin: 60px 60px; }
      }
      @keyframes birdmachine-grid {
        0%, 100% { transform: rotate(-2deg); opacity: 0.7; }
        50% { transform: rotate(2deg); opacity: 1; }
      }
      @keyframes birdmachine-pulse {
        0%, 100% { stroke-dasharray: 0 200; opacity: 0.2; }
        45%, 60% { stroke-dasharray: 200 0; opacity: 1; }
      }
      @keyframes birdmachine-glow {
        0%, 100% { opacity: 0.45; transform: translate3d(0,0,0); }
        50% { opacity: 0.9; transform: translate3d(0,-8px,0); }
      }
      @keyframes birdmachine-drift {
        0%, 100% { transform: translate3d(0,0,0) rotate(-3deg); }
        50% { transform: translate3d(0,-12px,0) rotate(3deg); }
      }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") {
      setVisible(true);
      return;
    }
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const palette = useMemo(() =>
    theme === "dark"
      ? {
          surface: "bg-black text-white",
          subtle: "text-white/60",
          border: "border-white/12",
          card: "bg-white/6",
          accent: "bg-white/12",
          glow: "rgba(255,255,255,0.14)",
          background: {
            color: "#040404",
            layers: [
              "radial-gradient(ellipse 80% 60% at 10% -10%, rgba(255,255,255,0.15), transparent 60%)",
              "radial-gradient(ellipse 90% 70% at 90% -20%, rgba(120,120,120,0.12), transparent 70%)",
            ],
            dots: "radial-gradient(circle at 25% 25%, rgba(250,250,250,0.08) 0.7px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(250,250,250,0.08) 0.7px, transparent 1px)",
          },
        }
      : {
          surface: "bg-white text-neutral-950",
          subtle: "text-neutral-600",
          border: "border-neutral-200/80",
          card: "bg-neutral-100/80",
          accent: "bg-neutral-100",
          glow: "rgba(17,17,17,0.08)",
          background: {
            color: "#f5f5f4",
            layers: [
              "radial-gradient(ellipse 80% 60% at 10% -10%, rgba(15,15,15,0.12), transparent 60%)",
              "radial-gradient(ellipse 90% 70% at 90% -20%, rgba(15,15,15,0.08), transparent 70%)",
            ],
            dots: "radial-gradient(circle at 25% 25%, rgba(17,17,17,0.12) 0.7px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(17,17,17,0.08) 0.7px, transparent 1px)",
          },
        },
    [theme]
  );

  const metrics = [
    { label: "Agences suivies", value: "12" },
    { label: "Missions actives", value: "34" },
    { label: "Précision données", value: "99%" },
  ];

  const sections = useMemo(() => ({
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
  }), []);

  const activeSection = sections[section];

  const missionSteps = [
    {
      name: "Découverte",
      detail: "Parcourez les lancements à venir triés par date. Filtrez par agence spatiale ou statut.",
      status: "Disponible",
    },
    {
      name: "Suivi",
      detail: "Accédez au détail complet d'une mission : fusée, site, charge utile, countdown.",
      status: "Disponible",
    },
    {
      name: "Journal",
      detail: "Consignez vos observations avant, pendant ou après le lancement.",
      status: "Bientôt",
    },
  ];

  const setSpotlight = (event: React.MouseEvent<HTMLLIElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--bm-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--bm-y", `${event.clientY - rect.top}px`);
  };

  const clearSpotlight = (event: React.MouseEvent<HTMLLIElement>) => {
    event.currentTarget.style.removeProperty("--bm-x");
    event.currentTarget.style.removeProperty("--bm-y");
  };

  return (
    <div className={`relative isolate min-h-screen w-full transition-colors duration-700 ${palette.surface}`}>
      {/* Fond */}
      <div className="pointer-events-none absolute inset-0 -z-30"
        style={{ backgroundColor: palette.background.color, backgroundImage: palette.background.layers.join(", "), backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-80"
        style={{ backgroundImage: palette.background.dots, backgroundSize: "12px 12px", backgroundRepeat: "repeat" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: theme === "dark" ? "radial-gradient(60% 50% at 50% 10%, rgba(255,255,255,0.18), transparent 70%)" : "radial-gradient(60% 50% at 50% 10%, rgba(17,17,17,0.12), transparent 70%)", filter: "blur(22px)" }}
      />

      <section
        ref={sectionRef}
        className={`relative flex min-h-screen w-full flex-col gap-16 px-6 py-24 transition-opacity duration-700 md:gap-20 md:px-10 lg:px-16 xl:px-24 ${visible ? "motion-safe:animate-[birdmachine-intro_1s_cubic-bezier(.22,.68,0,1)_forwards]" : "opacity-0"}`}
      >
        {/* En-tête héro */}
        <header className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:items-end">
          <div className="space-y-8">
            {/* <div className="flex flex-wrap items-center gap-4">
              <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.4em] ${palette.border} ${palette.accent}`}>
                Suivi de lancements spatiaux
              </span>
            </div> */}

            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
                BirdMachine — chaque lancement, chaque moment.
              </h1>
              <p className={`max-w-2xl text-base md:text-lg ${palette.subtle}`}>
                Suivez les prochaines missions spatiales en temps réel et tenez votre journal de bord personnel. SpaceX, NASA, ESA et plus — tout en un seul endroit.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className={`inline-flex flex-wrap gap-3 rounded-full border px-5 py-3 text-xs uppercase tracking-[0.3em] ${palette.border} ${palette.accent}`}>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                  Données en direct
                </span>
                <span className="opacity-60">∙</span>
                <span>Open source</span>
              </div>
              <div className={`flex divide-x overflow-hidden rounded-full border text-xs uppercase tracking-[0.35em] ${palette.border}`} style={{ borderColor: "inherit" }}>
                {metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col px-5 py-3">
                    <span className={`text-[11px] ${palette.subtle}`}>{metric.label}</span>
                    <span className="text-lg font-semibold tracking-tight">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carte section */}
          <div className={`relative flex flex-col gap-6 rounded-3xl border p-8 transition ${palette.border} ${palette.card}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em]">Explorer</p>
                <h2 className="text-xl font-semibold tracking-tight">{activeSection.title}</h2>
              </div>
              <OrbitGlyph theme={theme} />
            </div>
            <p className={`text-sm leading-relaxed ${palette.subtle}`}>{activeSection.description}</p>
            <div className="flex gap-2">
              {(["launches", "journal"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSection(key)}
                  className={`flex-1 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition ${section === key ? "bg-white text-black dark:bg-white/90 dark:text-black" : `${palette.border} ${palette.accent}`}`}
                >
                  {key === "launches" ? "Lancements" : "Journal"}
                </button>
              ))}
            </div>
            <ul className="space-y-2 text-sm">
              {activeSection.items.map((item) => (
                <li key={item} className={`flex items-start gap-3 ${palette.subtle}`}>
                  <span className="mt-1 h-2 w-2 rounded-full bg-current" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Grille basse */}
        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] xl:items-stretch">
          {/* Colonne gauche */}
          <div className={`order-2 flex flex-col gap-6 rounded-3xl border p-8 transition ${palette.border} ${palette.card} xl:order-1`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-[0.35em]">Fonctionnalités</h3>
              <span className="text-xs uppercase tracking-[0.35em] opacity-60">v1.0</span>
            </div>
            <p className={`text-sm leading-relaxed ${palette.subtle}`}>
              Conçu pour les passionnés de spatial qui veulent suivre les missions sans friction. Données fraîches, interface épurée, journal personnel intégré.
            </p>
            <div className="grid gap-3">
              {["Données serveur en cache", "Journal local persistent", "Interface bilingue FR/EN"].map((item) => (
                <div key={item} className="relative overflow-hidden rounded-2xl border px-4 py-3 text-xs uppercase tracking-[0.3em] transition duration-500 hover:-translate-y-0.5">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image centrale */}
          <figure className="order-1 overflow-hidden rounded-[32px] border transition xl:order-2" style={{ position: "relative" }}>
            <div className="relative w-full pb-[120%] sm:pb-[90%] lg:pb-[72%]">
              <img
                src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&q=80"
                alt="Fusée SpaceX Falcon 9 au décollage"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 ease-out hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 mix-blend-soft-light dark:from-white/10" />
              <span className="pointer-events-none absolute -left-16 top-16 h-40 w-40 rounded-full border border-white/15 opacity-70 motion-safe:animate-[birdmachine-glow_9s_ease-in-out_infinite]" />
              <span className="pointer-events-none absolute -right-12 bottom-16 h-48 w-48 rounded-full border border-white/10 opacity-40 motion-safe:animate-[birdmachine-drift_12s_ease-in-out_infinite]" />
            </div>
            <figcaption className={`flex items-center justify-between px-6 py-5 text-xs uppercase tracking-[0.35em] ${palette.subtle}`}>
              <span>Falcon 9 — Cape Canaveral</span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-8 bg-current" />
                SpaceX
              </span>
            </figcaption>
          </figure>

          {/* Colonne droite : étapes */}
          <aside className={`order-3 flex flex-col gap-6 rounded-3xl border p-8 transition ${palette.border} ${palette.card} xl:order-3`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-[0.35em]">Workflow</h3>
              <span className="text-xs uppercase tracking-[0.35em] opacity-60">3 étapes</span>
            </div>
            <ul className="space-y-4">
              {missionSteps.map((step, index) => (
                <li
                  key={step.name}
                  onMouseMove={setSpotlight}
                  onMouseLeave={clearSpotlight}
                  className="group relative overflow-hidden rounded-2xl border px-5 py-4 transition duration-500 hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                      background: theme === "dark"
                        ? "radial-gradient(190px circle at var(--bm-x, 50%) var(--bm-y, 50%), rgba(255,255,255,0.18), transparent 72%)"
                        : "radial-gradient(190px circle at var(--bm-x, 50%) var(--bm-y, 50%), rgba(17,17,17,0.12), transparent 72%)",
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.25em]">{step.name}</h4>
                    <span className="text-[10px] uppercase tracking-[0.35em] opacity-70">{step.status}</span>
                  </div>
                  <p className={`mt-3 text-sm leading-relaxed ${palette.subtle}`}>{step.detail}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
