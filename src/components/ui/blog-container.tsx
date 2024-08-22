import { Box, CircularProgress } from "@mui/material";
import BlogCard from "./blog-card";
import { BlogWithoutContent } from "@/pages/blog";
import { motion } from "framer-motion";
import { container, itemVariants } from "../utils/animations";

export default function BlogContainer({
    blogs,
}: {
    blogs: BlogWithoutContent[];
}) {
    console.log(blogs);
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
                {blogs?.map((blog) => (
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
            </Box>
        </>
    );
}
