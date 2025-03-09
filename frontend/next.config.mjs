/**
 * @type {import('next').NextConfig}
 */
const output = process.env.NODE_ENV === 'production' ? 'export' : 'standalone';
const nextConfig = {
  trailingSlash: true,
  distDir: 'build',
  output,
  basePath: '',
  swcMinify: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/web_pages/home',
      },

      {
        source: '/portfolio_gallery',
        destination: '/web_pages/portfolio_gallery',
      },

      {
        source: '/contact',
        destination: '/web_pages/contact',
      },

      {
        source: '/faq',
        destination: '/web_pages/faq',
      },

      {
        source: '/blog',
        destination: '/web_pages/blog',
      },
    ];
  },
};

export default nextConfig;
