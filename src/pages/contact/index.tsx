import ContactForm from "@/components/composites/contact/contact-form";
import FAQ from "@/components/composites/contact/faq";
import { getDatabase } from "@/lib/db";
import { FAQuestionWithId } from "@/types";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Page({ faqs }: { faqs: FAQuestionWithId[] }) {
    const t = useTranslations("seo.contact");
    const { locale } = useRouter();
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
            <ContactForm />
            <FAQ faqs={faqs} />
        </>
    );
}
export const getStaticProps = async (ctx: any) => {
    const db = await getDatabase();
    const result = await db.collection("faq").find().toArray();
    const faqs = result.map((faq) => {
        return {
            ...faq,
            _id: faq._id.toString(),
        };
    });

    return {
        props: {
            faqs,
            messages: (await import(`../../../messages/${ctx.locale}.json`))
                .default,
        },
    };
};
