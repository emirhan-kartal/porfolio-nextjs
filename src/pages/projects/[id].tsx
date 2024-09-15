import ContentWrapper from "@/components/ui/content-wrapper";
import { Box, Typography } from "@mui/material";
import GradientText from "@/components/ui/gradient-text";
import Image from "next/image";
import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import markdownToHtml from "@/lib/markdownToHtml";
import { useRouter } from "next/router";
import { ProjectData } from "@/types";
export default function Page({ data }: { data: ProjectData }) {
    const { locale } = useRouter();
    const { title, content, thumbnail } = data;
    return (
        <>
            <ContentWrapper content sx={{ pt: 15 }}>
                <Box>
                    <Typography mb={3} variant="h3">
                        {title}
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
                    src={thumbnail}
                    alt={title}
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
                <Box py={4} px={{xs:0,md:15,lg:30}} component={"div"} sx={{ wordBreak: "break-word" }}>
                    <Typography
                        variant="body1"
                        component={"div"}
                        dangerouslySetInnerHTML={{
                            __html: content,
                        }}
                    ></Typography>
                </Box>
            </ContentWrapper>
        </>
    );
}

export const getStaticProps = async ({
    params,
    locale,
}: {
    params: { id: string };
    locale: string;
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
    if (!locale) {
        return {
            notFound: true,
        };
    }
    const localizedProject = res[locale as "tr" | "en"];
    const markdownContent = await markdownToHtml(localizedProject.content);
    const data = {
        title: localizedProject.title,
        content: markdownContent,
        thumbnail: localizedProject.thumbnail,
        author: "Emirhan Kartal",
    };
    return {
        props: {
            data,
            messages: (await import(`../../../messages/${locale}`)).default,
        },
    };
};
export async function getStaticPaths({ locales }: { locales: string[] }) {
    // Replace 'http://localhost:3000' with your actual domain or environment variable
    const mongo = await getDatabase();
    const res = await mongo.collection("projects").find({}, {}).toArray();
    const paths = res.flatMap((project) => {
        return locales.map((locale) => ({
            params: { id: project._id.toString() },
            locale,
        }));
    });

    return {
        paths,

        fallback: false,
    };
}
