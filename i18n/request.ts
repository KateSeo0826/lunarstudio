import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale: requestLocale }) => {
    let locale = requestLocale;
    if (!routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    try {
        return {
            locale,
            messages: (await import(`../../messages/${locale}.json`)).default
        };
    } catch (error) {
        console.error(`Locale [${locale}] load failed, falling back to default.`, error);
        return {
            locale,
            messages: (await import(`../../messages/en.json`)).default
        };
    }
});