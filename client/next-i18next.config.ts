import { UserConfig } from 'next-i18next';

const nextI18nextConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  ns: ['common'],
  defaultNS: 'common',
  // Explicitly declare the config type
  localePath: typeof window === 'undefined' 
    ? require('path').resolve('./public/locales')
    : undefined,
};

export default nextI18nextConfig;