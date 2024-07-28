import AboutIntro from "@/components/layout/about/intro";
import GradientColon from "@/components/ui/gradient-colon";
import LazyLoad from "@/components/utils/LazyLoad";
import dynamic from "next/dynamic";

const DynamicTimeline = dynamic(import("@/components/layout/about/timeline"), {
    ssr: false,
});
const DynamicFollowMe = dynamic(import("@/components/layout/about/follow-me"), {
    ssr: false,
});
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
