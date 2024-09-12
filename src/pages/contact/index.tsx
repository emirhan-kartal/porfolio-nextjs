import ContactForm from "@/components/composites/contact/contact-form";
import FAQ from "@/components/composites/contact/faq";
import { getDatabase } from "@/lib/db";
import { FAQuestionWithId } from "@/types";

export default function Page({ faqs }: { faqs: FAQuestionWithId[] }) {
    return (
        <>
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
