import { Blog } from "@/pages/blog";
import axios from "./mock";
import { remark } from "remark";
import html from "remark-html";

export async function getAllBlogIds() {
    const paths = await axios.get("api/blogs", { params: { content: false } });
    const data = paths.data.blogs;
    return data.map((blog: { id: string }) => {
        return {
            params: {
                id: blog.id,
            },
        };
    });
}

export async function getBlogData(id: string) {
    const res = await axios.get(`api/blogs/${id}`);
    const data = res.data as Blog;
    const content = data.content;
    const proccessedContent = (await remark().use(html).process(content)).toString();

    return { ...data, content: proccessedContent };
}
