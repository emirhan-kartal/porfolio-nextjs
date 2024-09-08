import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import BlogCard from "./blog-card";
import { motion } from "framer-motion";
import { container, itemVariants } from "../utils/animations";
import {  useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { BlogWithoutContent } from "@/types";

type BlogContainerProps = {
    blogs: BlogWithoutContent[];
    paginate?: number;
    getPageAfter?: (cursor: string) => void;
};
export default function BlogContainer({
    blogs,
    paginate,
    getPageAfter,
}: BlogContainerProps) {
    //YOU SHOULD -2 TO THE PAGINATE BECAUSE LATEST 2 BLOGS ARE DISPLAYED IN THE BLOGS TOP
    console.log(blogs, "test blogs");
    console.log("test");
    const t = useTranslations("blog-container");

    const { locale } = useRouter();
    const [page, setPage] = useState(1);

    const lastBlogId = blogs.length !== 0 ? blogs[blogs.length - 1]._id : "-1";
    const handleChange = async (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        if (Math.ceil((paginate! - 2) / 5) === page) return;

        const receivedBlogsPageCount = Math.ceil(blogs.length / 5);
        if (value > page) {
            // if the user is going to the next page
            if (receivedBlogsPageCount === page && paginate && getPageAfter) {
                getPageAfter(lastBlogId);
            }
            setPage(page + 1);
        } else {
            setPage(page - 1);
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
                {blogs.slice((page - 1) * 5, (page - 1) * 5 + 5).map((blog) => (
                    <motion.div
                        key={blog[locale as "tr" | "en"].title}
                        variants={itemVariants}
                    >
                        <BlogCard {...blog} />
                    </motion.div>
                ))}
                {blogs.length === 0 && <Typography>{t("no-blogs")}</Typography>}
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
                        onChange={blogs.length !== 0 ? handleChange : undefined}
                        aria-label="pagination"
                    />
                )}
            </Box>
        </>
    );
}
