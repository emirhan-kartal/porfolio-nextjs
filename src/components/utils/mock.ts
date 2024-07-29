// mock.ts
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
            image: "/project.jpeg",
            link: "",
            tags: ["React", "Next.js"],
        },
        {
            title: "Project Title",
            description:
                "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/project.jpeg",
            link: "",
            tags: ["React", "Next.js"],
        },
    ],
});
mock.onGet("/api/projects").reply(200, {
    projects: [
        {
            title: "Project Title",
            description:
                "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/project.jpeg",
            link: "",
            tags: ["React", "Next.js"],
        },
        {
            title: "Project Title",
            description:
                "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/project.jpeg",
            link: "",
            tags: ["React", "Next.js"],
        },
        {
            title: "Project Title",
            description:
                "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/project.jpeg",
            link: "",
            tags: ["React", "Next.js"],
        },
    ],
});
mock.onGet("/api/blogs", { params: { content: false } }).reply(200, {
    blogs: [
        {
            title: "Blog 1",
            description:
                "This is blog 1 lorem ipsum dolor sit amet consectetur adipiscing elit",
            image: "https://via.placeholder.com/300",
            link: "https://google.com",
            tags: ["tag1", "tag2"],
            date: "2021-01-01",
        },
        {
            title: "Blog 2",
            description: "This is blog 2",
            image: "https://via.placeholder.com/300",
            link: "https://google.com",
            tags: ["tag1", "tag2"],
            date: "2021-01-02",
        },
        {
            title: "Blog 3",
            description: "This is blog 3",
            image: "https://via.placeholder.com/300",
            link: "https://google.com",
            tags: ["tag1", "Web Design"],
            date: "2021-01-03",
        },
    ],
});
mock.onGet("api/blogs/1").reply(200, {
    blog: {
        content: "This is the content of the blog",
    },
});


// Mock a POST request to /api/example
mock.onPost("/api/example").reply(201, {
    message: "Data created successfully",
});

// Exporting mock adapter instance
export default mock;
