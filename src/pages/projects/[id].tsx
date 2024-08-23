import ContentWrapper from "@/components/ui/content-wrapper";
import { Box, Typography } from "@mui/material";
import GradientText from "@/components/ui/gradient-text";
import Image from "next/image";
import { Project } from "@/components/composites/featured-projects";
import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import markdownToHtml from "@/lib/markdownToHtml";
export default function Page({ data }: { data: Project }) {
    console.log(data, "hello world");

    return (
        <>
            <ContentWrapper content sx={{ pt: 15 }}>
                <Box>
                    <Typography mb={3} variant="h3">
                        {data.title}
                    </Typography>
                    <GradientText>— By Emirhan Kartal</GradientText>
                </Box>
            </ContentWrapper>

            <Box
                width={"100%"}
                height={{ xs: 300, sm: 350, md: 400 }}
                position={"relative"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                bgcolor={"text.primary"}
            >
                <Image
                    src={data.thumbnail}
                    alt={data.title}
                    height={0}
                    width={0}
                    sizes="100wv"
                    style={{
                        width: "auto",
                        objectFit: "cover",
                        height: "100%",
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
        .collection("projects")
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
    };

    return {
        props: {
            data,
        },
    };
};
export async function getStaticPaths() {
    // Replace 'http://localhost:3000' with your actual domain or environment variable
    const mongo = await getDatabase();
    const res = await mongo.collection("projects").find().toArray();
    const paths = res.map((blog) => ({
        params: { id: blog._id.toString() },
    }));

    return {
        paths,
        fallback: false,
    };
}
