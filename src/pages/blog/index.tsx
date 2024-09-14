import BlogsAll from "@/components/composites/blog/blogs-all";
import BlogsTop from "@/components/composites/blog/blogs-top";
import ContentWrapper from "@/components/ui/content-wrapper";
import CTA from "@/components/ui/cta";
import GradientColon from "@/components/ui/gradient-colon";
import { getDatabase } from "@/lib/db";
import { Blog, BlogWithoutContent } from "@/types";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

export default function Page({
    initialBlogs,
    allBlogsCount,
}: {
    initialBlogs: BlogWithoutContent[];
    allBlogsCount: number;
}) {
    const [blogs, setBlogs] = useState<BlogWithoutContent[]>(initialBlogs);
    useEffect(() => {
        if (initialBlogs.length === 0 && allBlogsCount <= 6) return;
        getPageAfter(blogs[blogs.length - 1]._id);
    }, []);
    const getPageAfter = async (cursor: string) => {
        const nextPageBlog = await fetch("/api/blogs/next?cursor=" + cursor);
        const data = await nextPageBlog.json();
        setBlogs((prev) => {
            return [...prev, ...data];
        });
    };
    console.log(blogs, "blogs");
    return (
        <>
            <BlogsTop blogs={blogs} />
            <GradientColon />
            {blogs.length > 0 && (
                <BlogsAll
                    blogs={blogs}
                    allBlogsCount={allBlogsCount}
                    getPageAfter={getPageAfter}
                />
            )}
            <ContentWrapper content>
                <CTA mt={0} />
            </ContentWrapper>
        </>
    );
}

export const getStaticProps: GetStaticProps<object> = async (ctx) => {
    const db = await getDatabase();
    const allBlogsCount = await db.collection("blogs").countDocuments({});
    const blogsRetrieved = await db
        .collection("blogs")
        .find()
        .limit(6)
        .toArray();
    const initialBlogs = blogsRetrieved.map((blog) => {
        ctx.locales?.forEach((locale) => {
            blog[locale as "tr" | "en"] = {
                title: blog[locale as "tr" | "en"].title,
                description: blog[locale as "tr" | "en"].description,
                tags: blog[locale as "tr" | "en"].tags,
                thumbnail: blog[locale as "tr" | "en"].thumbnail,
            };
        });
        return {
            _id: blog._id.toString(),
            date: blog.date,
            thumbnail: blog.thumbnail,
            tr: blog.tr,
            en: blog.en,
        } as Blog;
    }) as Blog[];
    return {
        props: {
            initialBlogs,
            allBlogsCount,
            messages: (await import(`../../../messages/${ctx.locale}`)).default,
        },
    };
};
