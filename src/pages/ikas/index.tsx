import ContactForm from "@/components/composites/contact/contact-form";
import FAQ from "@/components/composites/contact/faq";
import ContentWrapper from "@/components/ui/content-wrapper";
import { getDatabase } from "@/lib/db";
import { FAQuestionWithId } from "@/types";
import { Typography } from "@mui/material";
import Head from "next/head";

export default function Page({ faqs }: { faqs: FAQuestionWithId[] }) {
    return (
        <>
            <Head>
                <meta
                    name="description"
                    content="İkas Hakkında Bilgi Almak İçin Aşağıdaki Formu Doldurabilirsiniz"
                />
                <title>İkas Bilgi - Emirhan Kartal</title>
            </Head>
            <ContentWrapper content>
                <Typography variant="h1" sx={{fontSize:{xs:"2.5rem",sm:"3rem",lg:"4rem"}}}>
                    Uzmandan İkas hakkında ÜCRETSİZ bilgi almak için aşağıdaki
                    formu doldurabilirsiniz.
                </Typography>
            </ContentWrapper>
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
