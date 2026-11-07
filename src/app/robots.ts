import type { MetadataRoute } from 'next';
import { getConfig } from '@/lib/config';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getConfig().site.url ?? 'https://shuoliu1024.github.io';
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
