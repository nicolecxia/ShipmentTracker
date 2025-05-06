import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'

const LanguageSwitcher = () => {
  const router = useRouter()
  const { locales, locale: currentLocale, pathname, query, asPath } = router

  // Debugging - log current state
//   useEffect(() => {
//     console.log('Current locale:', currentLocale)
//     console.log('Path:', asPath)
//   }, [currentLocale, asPath])

  return (
    <div className="flex gap-2">
      {locales?.map((locale) => (
        <Link
          key={locale}
          href={{ pathname, query }}
          as={asPath}
          locale={locale}
          className={`px-3 py-1 rounded-md text-sm ${
            currentLocale === locale
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}

export default LanguageSwitcher