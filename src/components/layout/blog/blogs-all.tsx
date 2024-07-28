import BlogContainer from "@/components/ui/blog-container";
import ContentWrapper from "@/components/ui/content-wrapper";
import GradientText from "@/components/ui/gradient-text";
import { Blog } from "@/pages/blog";

export default function BlosAll({ blogs }: { blogs: Blog[] }) {
    return (
        <ContentWrapper content>
            <GradientText sx={{ fontSize: "3rem", mb: 2 }}>
                Recent Insights
            </GradientText>
            <BlogContainer blogs={blogs} />
        </ContentWrapper>
    );
}
