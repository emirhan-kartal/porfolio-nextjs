import { Box, Typography } from "@mui/material";
import EButton from "./ebutton";
import Image from "next/image";
import { Project } from "../layout/featured-projects";



export default function ProjectCard({
    title,
    description,
    image,
    link,
    tags,
}: Project) {
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box
                height={{ xs: 250, sm: 300, md: 350 }}
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
                    src={image}
                    alt={title}
                    width={0}
                    height={0}
                    objectFit="cover"
                    sizes="100wv"
                    style={{ height: "auto", width: "auto" }}
                />
            </Box>
            <Box
                bgcolor={"secondary.main"}
                p={2}
                sx={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            >
                <Typography variant={"h5"}>{title}</Typography>
                <Typography variant={"body1"}>{description}</Typography>
                <Box display={"flex"} flexWrap={"wrap"} gap={1} mt={2}>
                    {tags.map((tag, index) => (
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
                <EButton type="black" sx={{ mt: 2 }}>
                    View Project
                </EButton>
            </Box>
        </Box>
    );
}
