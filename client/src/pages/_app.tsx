import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App({ Component, pageProps }: AppProps) {
  return (    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <Component {...pageProps} />
    </LocalizationProvider>
);
}
