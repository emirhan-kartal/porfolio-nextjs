import BlogsAll from "@/components/composites/blog/blogs-all";
import BlogsTop from "@/components/composites/blog/blogs-top";
import { Project } from "@/components/composites/featured-projects";
import ContentWrapper from "@/components/ui/content-wrapper";
import CTA from "@/components/ui/cta";
import GradientColon from "@/components/ui/gradient-colon";
import { getDatabase } from "@/lib/db";
import { GetStaticProps, GetStaticPropsResult } from "next";

export type Blog = Project & { author: string };
export type BlogWithoutContent = Omit<Blog, "content">;

export default function Page({ blogs }: { blogs: BlogWithoutContent[] }) {
    return (
        <>
            <BlogsTop blogs={blogs} />
            <GradientColon />
            <BlogsAll blogs={blogs} />
            <ContentWrapper content>
                <CTA mt={0} />
            </ContentWrapper>
        </>
    );
}

export const getStaticProps: GetStaticProps<object> = async () => {
    const db = await getDatabase();
    const query = await db
        .collection("blogs")
        .find({}, { projection: { content: 0 } })
        .toArray();
    console.log("it runs bro");
    const blogs = query.map((blog) => {
        return {
            title: blog.title,
            description: blog.description,
            image: blog.thumbnail,
            link: blog.link,
            tags: blog.tags,
            id: blog._id.toString(),
            date: blog.date,
        };
    });
    return {
        props: { blogs },
    };
};
