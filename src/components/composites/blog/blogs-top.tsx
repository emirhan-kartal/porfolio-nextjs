import BlogContainer from "@/components/ui/blog-container";
import ContentWrapper from "@/components/ui/content-wrapper";
import GradientText from "@/components/ui/gradient-text";
import { BlogWithoutContent } from "@/pages/blog";
import { Box, Typography } from "@mui/material";

export default function BlogsTop({ blogs }: { blogs: BlogWithoutContent[] }) {
    return (
        <ContentWrapper content>
            <Box display={"flex"} flexDirection={"column"}>
                <Box mb={4}>
                    <Typography variant="h2">Blogs & articles for</Typography>
                    <GradientText sx={{ fontSize: "4rem" }}>
                        Developers
                    </GradientText>
                </Box>

                <BlogContainer blogs={blogs?.slice(0, 2)} />
            </Box>
        </ContentWrapper>
    );
}
