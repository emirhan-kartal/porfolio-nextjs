import { Box, Typography } from "@mui/material";
import EButton from "./ebutton";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { blue } from "@mui/material/colors";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ProjectWithoutContent } from "@/types";
export default function ProjectCard(project: ProjectWithoutContent) {
    const { locale } = useRouter();
    const { _id } = project;
    const { title, description, tags, thumbnail } =
        project[locale as "tr" | "en"];
    const t = useTranslations("project-card");
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box
                height={{ xs: 300, sm: 350, md: 400 }}
                width={"100%"}
                flexGrow={1}
                display={"flex"}
                justifyContent={"center"}
                bgcolor={"text.primary"}
                sx={{
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    overflow: "hidden",
                    flexShrink: 0,
                }}
            >
                <Image
                    src={thumbnail}
                    alt={title}
                    width={0}
                    height={0}
                    sizes="100wv"
                    style={{
                        height: "auto",
                        objectFit: "cover",
                        width: "auto",
                    }}
                />
            </Box>
            <Box
                bgcolor={"secondary.main"}
                p={2}
                width={"100%"}
                sx={{
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    wordBreak: "break-word",
                }}
                height={{ xs: 200, sm: 250 }}
                display={"flex"}
                flexDirection={"column"}
            >
                <Typography variant={"h5"} mb={1}>
                    {title}
                </Typography>
                <Typography fontSize={14} color={"lightgray"} variant="h1">
                    {description}
                </Typography>

                <Typography mt={2}>Technologies Used:</Typography>
                <Box display={"flex"} flexWrap={"wrap"} gap={1}>
                    {tags.split(",").map((tag: any, index: number) => (
                        <Typography
                            key={index}
                            variant={"body2"}
                            bgcolor={"primary.main"}
                            color={"text.primary"}
                            p={1}
                            borderRadius={8}
                        >
                            {tag}
                        </Typography>
                    ))}
                </Box>
                <Box
                    display={"flex"}
                    alignItems="center"
                    mt={"auto"}
                    justifyContent={"space-between"}
                >
                    <Link href={"#github-link"}>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={1}
                            sx={{
                                transition: "transform 0.2s,color 0.2s",
                                cursor: "pointer",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    color: blue[300],
                                },
                                "&:active": {
                                    transform: "scale(1.01)",
                                    color: blue[500],
                                },
                            }}
                            color={blue[400]}
                        >
                            <Icon icon="akar-icons:github-fill" />

                            <Typography color={"inherit"}>View Code</Typography>
                        </Box>
                    </Link>
                    <Link href={"projects/" + _id}>
                        <EButton type="black">{t("view")}</EButton>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}
