import AboutIntro from "@/components/composites/about/intro";
import GradientColon from "@/components/ui/gradient-colon";
import LazyLoad from "@/components/utils/LazyLoad";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

const DynamicTimeline = dynamic(
    import("@/components/composites/about/timeline"),
    {
        ssr: false,
    }
);
const DynamicFollowMe = dynamic(
    import("@/components/composites/about/follow-me"),
    {
        ssr: false,
    }
);

export default function Page() {
    const { locale } = useRouter();
    const t = useTranslations("seo.about");
    return (
        <>
            <Head>
                <meta name="description" content={t("description")} />
                <meta name="keywords" content={t("keywords")} />
                <meta name="author" content={"Emirhan Kartal"} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="language" content={locale} />
                <title>{t("title")}</title>
            </Head>
            <AboutIntro />

            <GradientColon />

            <LazyLoad>
                <DynamicTimeline type="education-info" />
            </LazyLoad>

            <LazyLoad>
                <DynamicTimeline type="work-info" />
            </LazyLoad>

            <LazyLoad>
                <DynamicFollowMe />
            </LazyLoad>
        </>
    );
}

export const getStaticProps = async (ctx: any) => {
    return {
        props: {
            messages: (await import(`../../../messages/${ctx.locale}.json`))
                .default,
        },
    };
};
