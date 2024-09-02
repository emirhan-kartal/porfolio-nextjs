import BlogContainer from "@/components/ui/blog-container";
import ContentWrapper from "@/components/ui/content-wrapper";
import GradientText from "@/components/ui/gradient-text";
import { BlogWithoutContent } from "@/pages/blog";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function BlogsTop({ blogs }: { blogs: BlogWithoutContent[] }) {
    const t = useTranslations("blogs");
    return (
        <ContentWrapper content>
            <Box display={"flex"} flexDirection={"column"}>
                <Box mb={4}>
                    <Typography variant="h2">{t("top-1")}</Typography>
                    <GradientText sx={{ fontSize: "4rem" }}>
                        {t("top-2")}
                    </GradientText>
                </Box>

                <BlogContainer blogs={blogs?.slice(0, 2)} />
            </Box>
        </ContentWrapper>
    );
}
