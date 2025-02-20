/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['localhost'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // Speed Insights configuration
  experimental: {
    instrumentationHook: true
  },
  async redirects() {
    return [];
  },
  async rewrites() {
    return [];
  }
};

module.exports = nextConfig; 