import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { appWithTranslation } from "next-i18next";
import nextI18nextConfig from "next-i18next.config";


function App({ Component, pageProps }: AppProps) {
  return (    
    
    <ThemeContextProvider>
    < SessionProvider session={pageProps.session}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <Component {...pageProps} />
    </LocalizationProvider>
    </SessionProvider>
    </ThemeContextProvider>
    
);
}

export default appWithTranslation(App, nextI18nextConfig);