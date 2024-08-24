import { Box, CircularProgress, Pagination } from "@mui/material";
import BlogCard from "./blog-card";
import { BlogWithoutContent } from "@/pages/blog";
import { motion } from "framer-motion";
import { container, itemVariants } from "../utils/animations";
import { useEffect, useState } from "react";
import { fetcher } from "../utils/fetcher";
import useSWR, { mutate } from "swr";

export default function BlogContainer({
    blogs,
    paginate,
}: {
    blogs: BlogWithoutContent[]; //blogs sent by doing -2 in the slice because the first 2 blogs are displayed in the top
    paginate?: number;
}) {
    //YOU SHOULD -2 TO THE PAGINATE BECAUSE LATEST 2 BLOGS ARE DISPLAYED IN THE BLOGS TOP
    console.log();
    console.log(Math.ceil((paginate! - 2) / 5));
    const [receivedBlogs, setReceivedBlogs] = useState<
        BlogWithoutContent[] | undefined
    >();
    const [page, setPage] = useState(1);
    useEffect(() => {
        if (blogs && receivedBlogs === undefined) {
            setReceivedBlogs(blogs);
        }
    }, [blogs]);
    const lastBlogId = receivedBlogs?.[receivedBlogs.length - 1]._id;

    const handleChange = async (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        if (Math.ceil((paginate! - 2) / 5) === page) return;

        if (receivedBlogs) {
            const receivedBlogsPageCount = Math.ceil(receivedBlogs.length / 5);
            if (value > page) {
                if (receivedBlogsPageCount === page) {
                    const data = await fetch(
                        "/api/blogs/next?id=" + lastBlogId
                    );
                    const response = await data.json();
                    if (data) {
                        setReceivedBlogs([...receivedBlogs, ...response]);
                    }
                }

                setPage(page + 1);
            } else {
                setPage(page - 1);
            }
        }
    };

    return (
        <>
            <Box
                display="flex"
                flexDirection={"column"}
                gap={5}
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={container("wo-delay")}
            >
                {receivedBlogs
                    ?.slice((page - 1) * 5, (page - 1) * 5 + 5)
                    .map((blog) => (
                        <motion.div key={blog.title} variants={itemVariants}>
                            <BlogCard {...blog} />
                        </motion.div>
                    ))}
                {blogs === undefined && (
                    <Box
                        p={4}
                        bgcolor={"secondary.main"}
                        width={{ xs: "100%" }}
                    >
                        <Box
                            height={{ xs: 200, sm: 250 }}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <CircularProgress sx={{ color: "text.primary" }} />
                        </Box>
                    </Box>
                )}
                {paginate && (
                    <Pagination
                        count={Math.ceil((paginate - 2) / 5)} //checkout the comment above to understand why -2
                        color="primary"
                        sx={{
                            mx: "auto",
                        }}
                        onChange={handleChange}
                        aria-label="pagination"
                    />
                )}
            </Box>
        </>
    );
}
