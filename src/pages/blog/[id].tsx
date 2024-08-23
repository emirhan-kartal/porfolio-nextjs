import ContentWrapper from "@/components/ui/content-wrapper";
import { Box, Typography } from "@mui/material";
import { Blog } from "../blog";
import GradientText from "@/components/ui/gradient-text";
import Image from "next/image";
import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import markdownToHtml from "@/lib/markdownToHtml";
import Head from "next/head";
export default function Page({ data }: { data: Blog }) {
    console.log(data, "hello world");
    return (
        <>
            <Head>
                <title>{data.title}</title>
                <meta name="description" content={data.title} />
                <meta name="keywords" content={data.tags} />
                <meta name="author" content={data.author} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={data.title} />
                <meta property="og:description" content={data.description} />
                <meta property="og:image" content={data.thumbnail} />
            </Head>
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
                        dangerouslySetInnerHTML={{
                            __html: data.content,
                        }}
                    ></Typography>
                </Box>
            </ContentWrapper>
        </>
    );
}

export const getStaticProps = async ({
    params,
}: {
    params: { id: string };
}) => {
    const mongo = await getDatabase();
    const res = await mongo
        .collection("blogs")
        .findOne({ _id: new ObjectId(params.id) });
    if (!res) {
        return {
            notFound: true,
        };
    }
    const markdownContent = await markdownToHtml(res.content);
    const data = {
        title: res.title,
        content: markdownContent,
        thumbnail: res.thumbnail,
        author: res.author,
    } as Blog;

    return {
        props: {
            data,
        },
    };
};
export async function getStaticPaths() {
    // Replace 'http://localhost:3000' with your actual domain or environment variable
    const mongo = await getDatabase();
    const res = await mongo.collection("blogs").find().toArray();
    const paths = res.map((blog) => ({
        params: { id: blog._id.toString() },
    }));

    return {
        paths,
        fallback: false,
    };
}
