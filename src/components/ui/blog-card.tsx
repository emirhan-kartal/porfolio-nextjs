import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { BlogWithoutContent } from "@/pages/blog";
import { useTranslations } from "next-intl";
export default function BlogCard({
    tags,
    description,
    link,
    _id,
}: BlogWithoutContent) {
    console.log(tags);
    const t = useTranslations("blog-card")
    return (
        <Link href={"/blog/" + _id}>
            <Box
                display={"flex"}
                flexDirection={{ xs: "column", sm: "row" }}
                bgcolor={"secondary.main"}
                alignContent={"center"}
                justifyContent={"center"}
                gap={4}
                p={4}
                sx={{
                    transition: "transform 0.2s",
                    "&:hover": {
                        transform: "scale(1.01)",
                    },
                }}
            >
                <Box
                    width={{ xs: "100%", sm: "40%" }}
                    display={"flex"}
                    justifyContent={"center"}
                    height={{ xs: 200, sm: 250 }}
                >
                    <Image
                        height={0}
                        width={0}
                        sizes="100wv"
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                        }}
                        src={"/me.png"}
                        alt="author's picture"
                    />
                </Box>

                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={3}
                    width={{ xs: "100%", sm: "60%" }}
                    ml={{ sm: 4 }}
                >
                    <Box display={"flex"} gap={1.2}>
                        {tags.split(",").map((tag, index) => (
                            <Box
                                key={index}
                                bgcolor={"text.primary"}
                                color={"primary.main"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                px={2}
                                py={1}
                                borderRadius={8}
                            >
                                {tag}
                            </Box>
                        ))}
                    </Box>

                    <Typography fontSize={"1.6rem"} mb={1.5}>
                        {description}
                    </Typography>
                    <Typography>{t("view")}</Typography>
                </Box>
            </Box>
        </Link>
    );
}
