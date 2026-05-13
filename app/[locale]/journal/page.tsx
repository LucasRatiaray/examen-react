import { HeroWrapper } from "@/components/ui/hero-wrapper";
import { JournalList } from "@/components/journal-list";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon Journal",
  description: "Retrouvez toutes vos observations spatiales enregistrées.",
};

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <HeroWrapper>
      <div className="pt-16 pb-12 space-y-12">
        <header className="space-y-4">
          <h1
            className="text-4xl font-semibold tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Mon Journal
          </h1>
          <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Retrouvez toutes vos observations spatiales enregistrées.
          </p>
        </header>

        <JournalList />
      </div>
    </HeroWrapper>
  );
}
