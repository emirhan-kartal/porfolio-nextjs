import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { darkTheme } from "@/components/ui/theme";
import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AppCacheProvider {...pageProps}>
            <ThemeProvider theme={darkTheme}>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </ThemeProvider>
        </AppCacheProvider>
    );
}
