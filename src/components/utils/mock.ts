// mock.ts
import { Blog, BlogWithoutContent } from "@/pages/blog";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 200 });

// Mock a GET request to /api/example
mock.onGet("/api/projects", { params: { amount: 2 } }).reply(200, {
    projects: [
        {
            title: "Project Title",
            description:
                "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            thumbnail: "/project.jpeg",
            link: "",
            tags: ["React", "Next.js"],
        },
        {
            title: "Project Title",
            description:
                "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            thumbnail: "/project.jpeg",
            link: "",
            tags: ["React", "Next.js"],
        },
    ] as BlogWithoutContent[],
});
mock.onGet("/api/projects").reply(200, {
    projects: [
        {
            title: "Project Title",
            description:
                "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            thumbnail: "/project.jpeg",
            link: "",
            tags: ["React", "Next.js"],
        },
        {
            title: "Project Title",
            description:
                "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            thumbnail: "/project.jpeg",
            link: "",
            tags: ["React", "Next.js"],
        },
        {
            title: "Project Title",
            description:
                "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            thumbnail: "/project.jpeg",
            link: "",
            tags: ["React", "Next.js"],
        },
    ] as BlogWithoutContent[],
});
mock.onGet("/api/blogs", { params: { content: false } }).reply(200, {
    blogs: [
        {
            title: "Blog 1",
            description:
                "This is blog 1 lorem Allahsız kaplumbağa dolor sit amet consectetur adipiscing elit",
            thumbnail: "https://via.placeholder.com/300",
            link: "/blog/21",
            tags: ["tag1", "tag2"],
            date: "2021-01-01",
            author: "Emirhan Kartal",
            id: "21",
        },
        {
            title: "Blog 2",
            description: "This is blog 2",
            thumbnail: "https://via.placeholder.com/300",
            link: "https://google.com",
            tags: ["tag1", "tag2"],
            author: "Emirhan Kartal",
            date: "2021-01-02",
            id: "22",
        },
        {
            title: "Blog 3",
            description: "This is blog 3",
            thumbnail: "https://via.placeholder.com/300",
            link: "https://google.com",
            tags: ["tag1", "Web Design"],
            author: "Emirhan Kartal",
            date: "2021-01-03",
            id: "23",
        },
    ] as BlogWithoutContent[],
});
mock.onGet("/api/blogs/21").reply(200, {
    title: "Blog 1",
    description:
        "This is blog 1 lorem Allahsız kaplumbağa dolor sit amet consectetur adipiscing elit",
    thumbnail: "https://via.placeholder.com/300",
    link: "/blog/21",
    author: "Emirhan Kartal",
    tags: ["tag1", "tag2"],
    date: "2021-01-01",
    content: `# The Future of Web Development

Web development is an ever-evolving field, driven by continuous advancements in technology. Frameworks like Next.js and tools like Docker are revolutionizing how developers build and deploy applications. These innovations streamline development processes, enhance performance, and provide a more robust and scalable architecture.

Next.js, with its server-side rendering capabilities, allows for faster load times and better SEO performance. Its flexibility and ease of use make it a preferred choice for developers looking to create dynamic, high-performance web applications. Docker, on the other hand, simplifies the deployment process, ensuring that applications run consistently across different environments.

Embracing these new technologies is essential for developers who want to stay competitive. Continuous learning and adaptation are crucial in this fast-paced industry. By integrating these tools into your workflow, you can improve efficiency, reduce development time, and create more reliable applications.

Whether you are a seasoned developer or just starting, keeping up with the latest trends and technologies ensures you remain at the forefront of web development. Join us as we explore the future of web development, sharing insights, tutorials, and best practices to help you navigate this exciting field.

[Read More](#)
`,

    id: "21",
} as Blog);
mock.onGet("/api/blogs/22").reply(200, {
    title: "7 Tips to increase your UI/UX designs for your new projects",
    description: "This is blog 2",
    thumbnail: "https://via.placeholder.com/500/300",
    link: "https://google.com",
    tags: ["tag1", "tag2"],
    author: "Emirhan Kartal",
    content: `# The Future of Web Development

Web development is an ever-evolving field, driven by continuous  advancements in technology. Frameworks like Next.js and tools like Docker are revolutionizing how developers build and deploy applications. These innovations streamline development processes, enhance performance, and provide a more robust and scalable architecture.

Next.js, with its server-side rendering capabilities, allows for faster load times and better SEO performance. Its flexibility and ease of use make it a preferred choice for developers looking to create dynamic, high-performance web applications. Docker, on the other hand, simplifies the deployment process, ensuring that applications run consistently across different environments.

Embracing these new technologies is essential for developers who want to stay competitive. Continuous learning and adaptation are crucial in this fast-paced industry. By integrating these tools into your workflow, you can improve efficiency, reduce development time, and create more reliable applications.

![Hello](https://via.placeholder.com/400/300)


Whether you are a seasoned developer or just starting, keeping up with the latest trends and technologies ensures you remain at the forefront of web development. Join us as we explore the future of web development, sharing insights, tutorials, and best practices to help you navigate this exciting field.

[Read More](#)
`,

    date: "2021-01-02",
    id: "22",
});
mock.onGet("/api/blogs/23").reply(200, {
    title: "Blog 3",
    description: "This is blog 3",
    thumbnail: "https://via.placeholder.com/300",
    link: "https://google.com",
    author: "Emirhan Kartal",
    content: `# The Future of Web Development

Web development is an ever-evolving field, driven by continuous advancements in technology. Frameworks like Next.js and tools like Docker are revolutionizing how developers build and deploy applications. These innovations streamline development processes, enhance performance, and provide a more robust and scalable architecture.

Next.js, with its server-side rendering capabilities, allows for faster load times and better SEO performance. Its flexibility and ease of use make it a preferred choice for developers looking to create dynamic, high-performance web applications. Docker, on the other hand, simplifies the deployment process, ensuring that applications run consistently across different environments.

Embracing these new technologies is essential for developers who want to stay competitive. Continuous learning and adaptation are crucial in this fast-paced industry. By integrating these tools into your workflow, you can improve efficiency, reduce development time, and create more reliable applications.

Whether you are a seasoned developer or just starting, keeping up with the latest trends and technologies ensures you remain at the forefront of web development. Join us as we explore the future of web development, sharing insights, tutorials, and best practices to help you navigate this exciting field.

[Read More](#)
`,
    tags: ["tag1", "Web Design"],
    date: "2021-01-03",
    id: "23",
});

// Mock a POST request to /api/example
mock.onPost("/api/example").reply(201, {
    message: "Data created successfully",
});

// Exporting mock adapter instance
export default axios;
