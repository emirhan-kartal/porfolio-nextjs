import BlogContainer from "@/components/ui/blog-container";
import ContentWrapper from "@/components/ui/content-wrapper";
import GradientText from "@/components/ui/gradient-text";
import { BlogWithoutContent } from "@/pages/blog";

export default function BlogsAll({ blogs }: { blogs: BlogWithoutContent[] }) {
    return (
        <ContentWrapper content>
            <GradientText sx={{ fontSize: "3rem", mb: 2 }}>
                Recent Insights
            </GradientText>
            <BlogContainer blogs={blogs} />
        </ContentWrapper>
    );
}
