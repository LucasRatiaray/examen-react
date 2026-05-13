import { HeroWrapper } from "@/components/ui/hero-wrapper";
import { JournalList } from "@/components/journal-list";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Journal" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Journal");

  return (
    <HeroWrapper>
      <div className="pt-16 pb-12 space-y-12">
        <header className="space-y-4">
          <h1
            className="text-4xl font-semibold tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("title")}
          </h1>
          <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            {t("subtitle")}
          </p>
        </header>

        <JournalList />
      </div>
    </HeroWrapper>
  );
}
