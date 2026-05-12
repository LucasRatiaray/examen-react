import { HeroWrapper } from "@/components/ui/hero-wrapper";
import { getUpcomingLaunches } from "@/lib/spacedevs";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { LaunchCard } from "@/components/ui/launch-card";

export default async function LaunchesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const recentLaunches = await getUpcomingLaunches();

  return (
    <HeroWrapper>
      <div className="pt-16 space-y-12">
        <header className="space-y-4">
          <h1
            className="text-4xl font-semibold tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Lancements
          </h1>
          <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Retrouvez les prochains lancements mondiaux en temps réel.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recentLaunches.map((launch) => (
            <Link
              key={launch.id}
              href={`/launches/${launch.id}`}
              className="flex"
            >
              <LaunchCard launch={launch} />
            </Link>
          ))}
        </div>
      </div>
    </HeroWrapper>
  );
}
