import ContentWrapper from "@/components/ui/content-wrapper";
import { Box, Typography } from "@mui/material";
import { Blog } from "../blog";
import { getAllBlogIds, getBlogData } from "@/components/utils/blogs";
import GradientText from "@/components/ui/gradient-text";
import Image from "next/image";
import { ObjectId } from "mongodb";

export default function Page({ data }: { data: Blog }) {
    console.log(data, "hello world");
    return (
        <>
            <ContentWrapper content sx={{ pt: 15 }}>
                <Box>
                    <Typography mb={3} variant="h3">
                        {data.title}
                    </Typography>
                    <GradientText>— By {data.author}</GradientText>
                </Box>
            </ContentWrapper>
            <Box width={"100%"} height={{ xs: 300 }}>
                <Image
                    src={data.thumbnail}
                    alt={data.title}
                    height={350}
                    width={0}
                    style={{
                        width: "100%",
                    }}
                />
            </Box>
            <ContentWrapper content sx={{ bgcolor: "secondary.main" }}>
                <Box py={4} component={"div"}>
                    <Typography
                        variant="body1"
                        component={"div"}
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    ></Typography>
                </Box>
            </ContentWrapper>
        </>
    );
}
interface MongoBlog extends Blog {
    _id: ObjectId;
}
export async function getStaticPaths() {
    const res = await fetch("api/blogs");
    const data: MongoBlog[] = await res.json();
    const paths = data.map((blog: Blog) => {
        return {
            params: {
                id: blog.id,
            },
        };
    });

    return {
        paths,
        fallback: false,
    };
}
export async function getStaticProps({ params }: { params: { id: string } }) {
    const res = await fetch("api/blogs/" + params.id);
    const data = await res.json();

    return {
        props: {
            data,
        },
    };
}
