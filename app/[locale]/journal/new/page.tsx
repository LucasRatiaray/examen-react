import { HeroWrapper } from "@/components/ui/hero-wrapper";
import { ObservationForm } from "@/components/observation-form";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nouvelle Observation",
  description: "Ajoutez une nouvelle observation spatiale à votre journal.",
};

export default async function NewJournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <HeroWrapper>
      <div className="flex pt-16 pb-12">
        <Button variant="outline" size="icon" className="rounded-full" asChild>
          <Link
            href="/journal"
            aria-label="Retour au journal"
          >
            <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
          </Link>
        </Button>
        <ObservationForm />
      </div>
    </HeroWrapper>
  );
}
