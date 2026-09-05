const IMMUTABLE_ASSET_PREFIXES = ['/images', '/ballparks', '/summer', '/writing']

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Prefer AVIF (smaller) then WebP; cache optimized variants for a year.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/resume.pdf',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/projects',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      // Static asset folders under public/ get year-long immutable caching. Anything
      // added here must use new filenames when the content changes.
      ...IMMUTABLE_ASSET_PREFIXES.map((prefix) => ({
        source: `${prefix}/:path*`,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      })),
      {
        source: '/resume.pdf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
