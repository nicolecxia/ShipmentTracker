/* eslint-disable */
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ShipmentDataGrid from "@/components/ShipmentDataGrid";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
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
