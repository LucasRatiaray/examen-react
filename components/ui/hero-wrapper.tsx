"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

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
`;

export function HeroWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

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
    if (!sectionRef.current) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
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

  return (
    <div className="relative isolate min-h-screen w-full bg-white text-neutral-950 transition-colors duration-700 dark:bg-black dark:text-white">
      <div
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          backgroundColor: bgColor,
          backgroundImage: bgGradient,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: topGlow, filter: "blur(22px)" }}
      />
      <section
        ref={sectionRef}
        className={`relative flex min-h-screen w-full flex-col gap-16 px-6 py-24 transition-opacity duration-700 md:gap-20 md:px-10 lg:px-16 xl:px-24 ${visible ? "motion-safe:animate-[birdmachine-intro_1s_cubic-bezier(.22,.68,0,1)_forwards]" : "opacity-0"}`}
      >
        {children}
      </section>
    </div>
  );
}
