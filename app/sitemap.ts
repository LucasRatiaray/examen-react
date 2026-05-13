import { MetadataRoute } from 'next';
import { getUpcomingLaunches, SpaceDevsLaunch } from '@/lib/spacedevs';
import { locales } from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

function getUrl(path: string, locale: string) {
  const basePath = path === '/' ? '' : path;
  return `${BASE_URL}/${locale}${basePath}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // si API ne repond pas on retourne un tableau vide
  let launches: SpaceDevsLaunch[] = [];
  try {
    launches = await getUpcomingLaunches();
  } catch (e) {
    console.error("Erreur lors de la génération du sitemap dynamique", e);
  }

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // page statiques
  const staticPaths = ['/', '/launches', '/journal', '/journal/new'];
  staticPaths.forEach((path) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: getUrl(path, locale),
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: path === '/' ? 1 : 0.8, // important pour le référencement (1=le plus important, 0.8=moins important)
        alternates: {
          languages: {
            fr: getUrl(path, 'fr'),
            en: getUrl(path, 'en'),
          },
        },
      });
    });
  });

  // pages dynamiques (détails des lancements)
  launches.forEach((launch) => {
    const path = `/launches/${launch.id}`;
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: getUrl(path, locale),
        lastModified: new Date(launch.net),
        changeFrequency: 'hourly',
        priority: 0.9,
        alternates: {
          languages: {
            fr: getUrl(path, 'fr'),
            en: getUrl(path, 'en'),
          },
        },
      });
    });
  });

  return sitemapEntries;
}
