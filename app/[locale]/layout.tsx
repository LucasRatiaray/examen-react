import "@/app/globals.css";
import { Header } from "@/components/ui/header";
import { ThemeProvider } from "@/components/theme-provider";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { JournalProvider } from "@/context/JournalContext";
import type { Metadata } from "next";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: "%s | BirdMachine",
    default: "BirdMachine - Explorateur Spatial",
  },
  description: "Suivez les lancements spatiaux en temps réel et tenez votre journal d'observations.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <JournalProvider>
              <Header />
              <main>{children}</main>
            </JournalProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
