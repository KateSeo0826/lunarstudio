/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {

  allowedDevOrigins: [
    'http://localhost:3000',
    'http://10.0.0.65:3000',

  ],
  images: {
    remotePatterns: [new URL('https://cdn.prod.website-files.com/68ee74b7102caefef6ce78ac/**'),
    new URL('https://cdn.prod.website-files.com/692e410b4406ea2cf410f589/**'
    )
    ],
  },

};
export default withNextIntl(nextConfig);