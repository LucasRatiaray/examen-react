"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function HeroWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
