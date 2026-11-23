import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE = 'https://pankaj2816.github.io/ajay-choudhary-chemistry';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/class-9',
    '/class-10',
    '/class-11',
    '/class-12',
    '/study-materials',
    '/question-papers',
    '/solutions',
    '/updates',
    '/subjects',
    '/about',
    '/contact',
  ];
  return routes.map((r) => ({
    url: `${SITE}${r}`,
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : r.startsWith('/class-') ? 0.9 : 0.7,
  }));
}
