import { Box, Typography } from "@mui/material";
import EButton from "./ebutton";
import Image from "next/image";
import {
    ProjectWithoutContent,
} from "../composites/featured-projects";
import Link from "next/link";
export default function ProjectCard({
    title,
    description,
    thumbnail,
    link,
    tags,
    id,
}: ProjectWithoutContent) {
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box
                height={{ xs: 300, sm: 350, md: 400 }}
                display={"flex"}
                justifyContent={"center"}
                bgcolor={"text.primary"}
                sx={{
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    overflow: "hidden",
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
                        width: "auto",
                        objectFit: "cover",
                    }}
                />
            </Box>
            <Box
                bgcolor={"secondary.main"}
                p={2}
                sx={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            >
                <Typography variant={"h5"} mb={1}>
                    {title}
                </Typography>
                <Typography
                    variant={"body1"}
                    height={40}
                    fontSize={13}
                    color={"lightgray"}
                >
                    {description}
                </Typography>
                <Box display={"flex"} flexWrap={"wrap"} gap={1} mt={2}>
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
                <Link href={"projects/" + id}>
                    <EButton type="black" sx={{ mt: 2 }}>
                        View Project
                    </EButton>
                </Link>
            </Box>
        </Box>
    );
}
