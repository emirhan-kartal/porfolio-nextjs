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
                        <Header />
                        <Component {...pageProps} />
                        <Footer />
                    </SessionProvider>
                </ThemeProvider>
            </AppCacheProvider>
        </NextIntlClientProvider>
    );
}
