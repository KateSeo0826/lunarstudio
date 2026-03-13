import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

import enMessages from '../../messages/en.json';
import koMessages from '../../messages/ko.json';

const messagesMap: Record<string, any> = {
    en: enMessages,
    ko: koMessages
};

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        messages: messagesMap[locale]
    };
});