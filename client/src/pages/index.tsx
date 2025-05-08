/* eslint-disable */
'use client';
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ShipmentDataGrid from "@/components/ShipmentDataGrid";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import ThemeToggle from "@/components/ThemeToggle";
import { useThemeContext } from "@/context/ThemeContext";

import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '@/utils/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nextConfig from "next-i18next.config";
import { GetStaticProps } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function Home() {
  // const { t, i18n } = useTranslation('common');
  
  // console.log('Current language:', i18n.language);
  // console.log('Loaded translations:', JSON.stringify(i18n.store.data[i18n.language]?.common,null,2));

  // return (
  //   <div>
  //       <LanguageSwitcher />
  //     <h1>{t('header.title')}</h1>
  //     <p>Simple test: {t('test_key')}</p>
  //   </div>
  // );

  const { data: session, status } = useSession({ 
    required: true,
    onUnauthenticated() {
      router.push(`${window.location.origin}/auth/signin`);
    } }); // Requires authentication

  const router = useRouter();
  useEffect(() => {
    router.push("/shipments");
  },[]);

  return null;

}

// export async function getStaticProps({locale}) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
//     },
//   }
// }

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18nextConfig)),
      // Add nullish coalescing for locale
    },
  };
};


export default Home