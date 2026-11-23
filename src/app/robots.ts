import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/ajay-choudhary-chemistry/admin' },
    sitemap: 'https://pankaj2816.github.io/ajay-choudhary-chemistry/sitemap.xml',
  };
}
