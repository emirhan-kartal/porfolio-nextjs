import Footer from "@/components/composites/layout/footer";
import Header from "@/components/composites/layout/header";
import { darkTheme } from "@/components/ui/theme";
import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import SnackbarProvider from "@/components/context/snackbarContext";
import SnackBarFeedback from "@/components/ui/snackbar-feedback";
import LoadingProvider from "@/components/context/loadingContext";
import LoadingScreen from "@/components/ui/loading-screen";
import { Analytics } from "@vercel/analytics/react";
export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    const router = useRouter();
    return (
        <NextIntlClientProvider
            locale={router.locale}
            messages={pageProps.messages}
            timeZone="Europe/Istanbul"
        >
            <AppCacheProvider {...pageProps}>
                <ThemeProvider theme={darkTheme}>
                    <SessionProvider session={session}>
                        <LoadingProvider>
                            <Header />
                            <SnackbarProvider>
                                <Component {...pageProps} />
                                <Analytics />
                                <SnackBarFeedback />
                                <LoadingScreen />
                            </SnackbarProvider>
                            <Footer />
                        </LoadingProvider>
                    </SessionProvider>
                </ThemeProvider>
            </AppCacheProvider>
        </NextIntlClientProvider>
    );
}
