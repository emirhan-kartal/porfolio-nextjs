import BlogsAll from "@/components/layout/blog/blogs-all";
import BlogsTop from "@/components/layout/blog/blogs-top";
import { Project } from "@/components/layout/featured-projects";
import GradientColon from "@/components/ui/gradient-colon";

export type Blog = Project & { date: string; author: string; content: string };
export default function Page() {
    const blogs: Blog[] = [
        {
            title: "Blog 1",
            description: "This is blog 1 lorem ipsum dolor sit amet consectetur adipiscing elit", 
            image: "https://via.placeholder.com/300",
            link: "https://google.com",
            tags: ["tag1", "tag2"],
            date: "2021-01-01",
            content: "This is the content of blog 1",
            author: "John Doe",
        },
        {
            title: "Blog 2",
            description: "This is blog 2",
            image: "https://via.placeholder.com/300",
            link: "https://google.com",
            tags: ["tag1", "tag2"],
            date: "2021-01-02",
            content: "This is the content of blog 2",
            author: "Jane Doe",
        },
        {
            title: "Blog 3",
            description: "This is blog 3",
            image: "https://via.placeholder.com/300",
            link: "https://google.com",
            tags: ["tag1", "Web Design"],
            date: "2021-01-03",
            content: "This is the content of blog 3",
            author: "John Doe",
        },
    ];
    return (
        <>
            <BlogsTop blogs={blogs} />
            <GradientColon />
            <BlogsAll blogs={blogs} />
        </>
    );
}
