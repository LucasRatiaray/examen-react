import "@/app/globals.css";
import { Header } from "@/components/ui/header";
import { ThemeProvider } from "@/components/theme-provider";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Header />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
