import path from 'path'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import  nextI18nextConfig from '../../next-i18next.config';
import { GetStaticPropsContext } from 'next';

export const getI18nPaths = () =>
  nextI18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }))

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
})

// export async function getI18nProps(ctx: any, ns = ['common']) {
//   const locale = ctx?.params?.locale
//   return {
//     ...(await serverSideTranslations(locale, ns)),
//   }
// }

export const getI18nProps = async (ctx: GetStaticPropsContext, ns: string[] = ['common']) => {
    const locale = ctx.locale ?? ctx.defaultLocale ?? 'en' // Fallback chain
    
    return {
      ...(await serverSideTranslations(locale, ns)),
    }
  }

export function makeStaticProps(ns: string[] = []) {
  return async function getStaticProps(ctx: any) {
    return {
      props: await getI18nProps(ctx, ns),
    }
  }
}