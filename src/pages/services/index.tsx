import ServiceList from "@/components/composites/services/service-list";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTransition } from "react";

interface Params {
    messages: Record<string, string>;
}

export default function Page({ messages }: Params) {
    const t = useTranslations("seo.services");
    const { locale } = useRouter();

    return (
        <>
            <Head>
                <meta name="description" content={messages["description"]} />
                <meta name="keywords" content={t("keywords")} />
                <meta name="author" content={"Emirhan Kartal"} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="language" content={locale} />
                <title>{t("title")}</title>
            </Head>
            <ServiceList />
        </>
    );
}

const getStaticProps: GetStaticProps<Params> = async (
    ctx
): Promise<GetStaticPropsResult<Params>> => {
    return {
        props: {
            messages: (await import(`../../../messages/${ctx.locale}.json`))
                .default,
        },
    };
};
export { getStaticProps };
