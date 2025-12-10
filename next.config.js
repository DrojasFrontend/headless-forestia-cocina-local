const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        // Rewrite para wp-content desde WordPress
        // NOTA: Next.js da PRIORIDAD a archivos estáticos en public/ sobre rewrites
        // Los PDFs en public/wp-content/uploads/ se servirán localmente automáticamente
        source: '/wp-content/:path*',
        destination: 'https://wordpress-1203663-4959517.cloudwaysapps.com/wp-content/:path*',
      },
    ]
  },
});
