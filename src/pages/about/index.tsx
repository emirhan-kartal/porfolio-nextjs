import AboutIntro from "@/components/composites/about/intro";
import GradientColon from "@/components/ui/gradient-colon";
import LazyLoad from "@/components/utils/LazyLoad";
import dynamic from "next/dynamic";

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
    return (
        <>
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
