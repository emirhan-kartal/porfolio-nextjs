import BlogsAll from "@/components/composites/blog/blogs-all";
import BlogsTop from "@/components/composites/blog/blogs-top";
import { Project } from "@/components/composites/featured-projects";
import ContentWrapper from "@/components/ui/content-wrapper";
import CTA from "@/components/ui/cta";
import GradientColon from "@/components/ui/gradient-colon";
import axios from "@/components/utils/mock";
import { GetStaticProps, GetStaticPropsResult } from "next";

export type Blog = Project & {  author: string; };
export type BlogWithoutContent = Omit<Blog, "content">;

export default function Page({ blogs }: { blogs: BlogWithoutContent[] }) {
    return (
        <>
            <BlogsTop blogs={blogs} />
            <GradientColon />
            <BlogsAll blogs={blogs} />
            <ContentWrapper content>
                <CTA mt={0}/>
            </ContentWrapper>
        </>
    );
}

export const getStaticProps: GetStaticProps<object> = async (): Promise<
    GetStaticPropsResult<BlogWithoutContent[]>
> => {
    const blogs = await axios.get("api/blogs", { params: { content: false } });
    const data = blogs.data as BlogWithoutContent[];
    return {
        props: data,
    };
};
