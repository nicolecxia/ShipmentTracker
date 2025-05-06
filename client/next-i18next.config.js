const path = require('path') 

module.exports = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'fr'],
      localeDetection: false, // Optional: disable automatic locale detection
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development', // Auto-reload in dev
    // localePath: path.resolve('./public/locales'),
      ns: ['common'], // Add all namespaces used
      defaultNS: 'common'
  }