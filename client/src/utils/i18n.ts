import path from 'path'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n as i18nConfig } from '../../next-i18next.config';
import { GetStaticPropsContext } from 'next';

export const getI18nPaths = () =>
  i18nConfig.locales.map((lng) => ({
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