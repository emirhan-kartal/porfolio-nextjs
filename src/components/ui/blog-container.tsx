import { Box } from "@mui/material";
import BlogCard from "./blog-card";
import { BlogWithoutContent } from "@/pages/blog";
import { motion } from "framer-motion";
import { container, itemVariants } from "../utils/animations";

export default function BlogContainer({
    blogs,
}: {
    blogs: BlogWithoutContent[];
}) {
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
                {blogs.map((blog) => (
                    <motion.div key={blog.title} variants={itemVariants}>
                        <BlogCard {...blog} />
                    </motion.div>
                ))}
            </Box>
        </>
    );
}
