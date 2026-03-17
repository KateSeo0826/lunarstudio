/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://10.0.0.65:3000',

  ],
};
export default withNextIntl(nextConfig);