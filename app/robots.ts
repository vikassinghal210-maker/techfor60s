import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '!/api/og'],
      },
    ],
    sitemap: ['https://techfor60s.com/sitemap.xml'],
  }
}
