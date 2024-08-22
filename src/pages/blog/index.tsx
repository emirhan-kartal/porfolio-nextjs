import BlogsAll from "@/components/composites/blog/blogs-all";
import BlogsTop from "@/components/composites/blog/blogs-top";
import { Project } from "@/components/composites/featured-projects";
import ContentWrapper from "@/components/ui/content-wrapper";
import CTA from "@/components/ui/cta";
import GradientColon from "@/components/ui/gradient-colon";
import { getDatabase } from "@/lib/db";
import useSWR from "swr";

export type Blog = Project & { author: string };
export type BlogWithoutContent = Omit<Blog, "content">;
const fetcher = async (url: string) => {
    await sleep(1000);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch");
    }
    return response.json();
};
export default function Page() {
    const { data, error, isLoading } = useSWR("/api/blogs", fetcher);
    if (error) {
        return <div>Error</div>;
    }
    return (
        <>
            <BlogsTop blogs={data} />
            <GradientColon />
            <BlogsAll blogs={data} />
            <ContentWrapper content>
                <CTA mt={0} />
            </ContentWrapper>
        </>
    );
}
function sleep(arg0: number) {
    //make the app sleep for a while
    return new Promise((resolve) => setTimeout(resolve, arg0));
}
