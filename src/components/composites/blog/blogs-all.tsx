import BlogContainer from "@/components/ui/blog-container";
import ContentWrapper from "@/components/ui/content-wrapper";
import GradientText from "@/components/ui/gradient-text";
import { useTranslations } from "next-intl";

export default function BlogsAll({
    data,
}: {
    data: { blogs: any[]; blogCount: number };
}) {
    const t = useTranslations("blogs");
    return (
        <ContentWrapper content>
            <GradientText sx={{ fontSize: "3rem", mb: 2 }}>
                {t("recent")}
            </GradientText>
            <BlogContainer
                blogs={data?.blogs?.slice(2)}
                paginate={data?.blogCount}
            />
        </ContentWrapper>
    );
}
