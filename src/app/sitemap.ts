import type { MetadataRoute } from 'next';
import { getConfig } from '@/lib/config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getConfig().site.url ?? 'https://shuoliu1024.github.io';
  return [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
  ];
}
