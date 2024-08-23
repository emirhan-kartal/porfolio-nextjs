import BlogContainer from "@/components/ui/blog-container";
import ContentWrapper from "@/components/ui/content-wrapper";
import GradientText from "@/components/ui/gradient-text";
import { BlogWithoutContent } from "@/pages/blog";
import { Pagination } from "@mui/material";

export default function BlogsAll({
    data,
}: {
    data: { blogs: any[]; blogCount: number };
}) {
    console.log(data, "asdasdasd");
    return (
        <ContentWrapper content>
            <GradientText sx={{ fontSize: "3rem", mb: 2 }}>
                Recent Insights
            </GradientText>
            <BlogContainer
                blogs={data?.blogs?.slice(2)}
                paginate={data?.blogCount}
            />
        </ContentWrapper>
    );
}
