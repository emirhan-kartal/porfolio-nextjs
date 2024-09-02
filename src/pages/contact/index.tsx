import ContactForm from "@/components/composites/contact/contact-form";
import FAQ from "@/components/composites/contact/faq";

export default function Page() {
    return (
        <>
            <ContactForm />
            <FAQ />
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
