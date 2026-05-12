import { NextRequest, NextResponse } from "next/server";

// Langues supportées par l'application
const locales = ["fr", "en"];
const defaultLocale = "fr";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si l'URL contient déjà une locale supportée
  // ex: /fr/journal ou /en/launches → on ne fait rien
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Détecter la langue préférée de l'utilisateur via l'en-tête Accept-Language
  // ex: "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7"
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferredLocale = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().slice(0, 2)) // extraire "fr" de "fr-FR"
    .find((lang) => locales.includes(lang));

  const locale = preferredLocale ?? defaultLocale;

  // Rediriger vers /<locale><pathname>
  // ex: / → /fr  |  /journal → /fr/journal
  const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(redirectUrl);
}

// Définir sur quelles routes le proxy s'exécute
// On exclut les fichiers statiques, images, et l'API Next.js interne
export const config = {
  matcher: ["/((?!_next|favicon.ico|api|.*\\..*).*)"],
};
