import { HeroWrapper } from "@/components/ui/hero-wrapper";
import { getLaunchById, getUpcomingLaunches } from "@/lib/spacedevs";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrbitGlyph } from "@/components/orbit-glyph";
import { DottedCard } from "@/components/ui/dotted-card";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const launches = await getUpcomingLaunches();
  return launches.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const launch = await getLaunchById(id);
  
  if (!launch) return { title: "Lancement introuvable" };

  return {
    title: `${launch.name} · BirdMachine`,
    description:
      launch.mission?.description ||
      "Détails du lancement spatial sur BirdMachine.",
  };
}

export default async function LaunchDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  setRequestLocale(locale);

  const launch = await getLaunchById(id);
  if (!launch) notFound();

  const dateObj = new Date(launch.net);
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(dateObj);

  return (
    <HeroWrapper>
      <div className="pt-16">
        <Button variant="outline" size="icon" className="rounded-full" asChild>
          <Link
            href="/launches"
            aria-label="Retour aux lancements"
          >
            <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col justify-between space-y-12">
          <header className="space-y-6">
            <h1
              className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {launch.name.split("|")[0]}
            </h1>
            <p className="max-w-2xl text-base text-neutral-600 dark:text-white/60 md:text-lg">
              {!launch.mission?.description || launch.mission.description === "Details TBD."
                ? "Aucune description détaillée n'est encore disponible pour cette mission."
                : launch.mission.description}
            </p>
          </header>

          <DottedCard>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] opacity-60">
                  Informations de vol
                </p>
                <h2
                  className="text-xl font-semibold tracking-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Détails du lancement
                </h2>
              </div>
              <OrbitGlyph />
            </div>

            <p className="text-sm leading-relaxed text-neutral-600 dark:text-white/60">
              Retrouvez ci-dessous les données techniques et contextuelles de cette mission spatiale.
            </p>

            <ul className="space-y-2 text-sm text-neutral-600 dark:text-white/60">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-current" />
                <span className="capitalize">Date : {formattedDate}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-current" />
                <span>Statut : {launch.status.name}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-current" />
                <span>
                  Fusée : {launch.rocket?.configuration.name || "Inconnue"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-current" />
                <span>
                  Agence : {launch.launch_service_provider?.name || "Inconnue"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-current" />
                <span>
                  Site : {launch.pad?.name} - {launch.pad?.location.country_code}
                </span>
              </li>
            </ul>
          </DottedCard>
        </div>

        <figure className="flex flex-col overflow-hidden rounded-[32px] border border-neutral-200/80 transition dark:border-white/12">
          <div className="relative w-full flex-1 min-h-[400px]">
            {launch.image ? (
              <Image
                src={launch.image}
                alt={launch.name}
                fill
                unoptimized
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-white/5">
                <span className="opacity-50">Aucune image disponible</span>
              </div>
            )}
          </div>
          
          <figcaption className="flex items-center justify-between px-6 py-5 text-[0.65rem] sm:text-xs uppercase tracking-[0.35em] text-neutral-600 dark:text-white/60">
            <span className="truncate pr-4">{launch.rocket?.configuration.name} — {launch.pad?.name}</span>
            <span className="flex shrink-0 items-center gap-2">
              <span className="h-1 w-6 sm:w-8 bg-current" />
              <span className="truncate max-w-[100px] sm:max-w-none">{launch.launch_service_provider?.name || "Agence"}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </HeroWrapper>
  );
}
