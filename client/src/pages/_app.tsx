import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider } from "@/context/ThemeContext";


export default function App({ Component, pageProps }: AppProps) {
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
