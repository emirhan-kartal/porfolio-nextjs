import ServiceList from "@/components/composites/services/service-list";
import { GetStaticProps, GetStaticPropsResult } from "next";

interface Params {
    messages: Record<string, string>;
}

export default function Page({ messages }: Params) {
    return <ServiceList />;
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