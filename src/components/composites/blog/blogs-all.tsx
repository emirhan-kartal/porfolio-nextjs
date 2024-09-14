import BlogContainer from "@/components/ui/blog-container";
import ContentWrapper from "@/components/ui/content-wrapper";
import GradientText from "@/components/ui/gradient-text";
import { Blog } from "@/types";
import { useTranslations } from "next-intl";
interface BlogsAllProps {
    allBlogsCount: number;
    blogs: Blog[];
    getPageAfter: (cursor: string) => void;
}
export default function BlogsAll({
    allBlogsCount,
    blogs,
    getPageAfter,
}: BlogsAllProps) {
    const t = useTranslations("blogs");
    return (
        <ContentWrapper content>
            <GradientText sx={{ fontSize: "3rem", mb: 2 }}>
                {t("recent")}
            </GradientText>
            <BlogContainer
                blogs={blogs.slice(2)}
                paginate={allBlogsCount}
                getPageAfter={getPageAfter}
            />
        </ContentWrapper>
    );
}
