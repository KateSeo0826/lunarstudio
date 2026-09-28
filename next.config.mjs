/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://10.0.0.65:3000',

  ],
};
export default withNextIntl(nextConfig);
