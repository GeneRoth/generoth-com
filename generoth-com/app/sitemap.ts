import { MetadataRoute } from 'next'

// Single-page site: only the canonical homepage is a real, indexable URL.
// Fragment URLs (#about, #portfolio, #contact) are stripped by Google and
// were creating duplicate entries pointing at the same page.
//
// Add new entries here when /blog, /case-studies, etc. ship.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://generoth.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
