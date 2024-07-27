import FollowMe from "@/components/layout/about/follow-me";
import AboutIntro from "@/components/layout/about/intro";
import Timeline from "@/components/layout/about/timeline";
import GradientColon from "@/components/ui/gradient-colon";
import LazyLoad from "@/components/utils/LazyLoad";
import dynamic from "next/dynamic";

const DynamicTimeline = dynamic(import("@/components/layout/about/timeline"), {
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
                <FollowMe />
            </LazyLoad>
        </>
    );
}
