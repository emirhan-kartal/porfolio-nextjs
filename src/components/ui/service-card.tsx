import { Box, Typography } from "@mui/material";
import Image from "next/image";
import EButton from "./ebutton";
import { motion } from "framer-motion";
import { itemVariants } from "../utils/animations";
interface ServiceCardProps {
    title: string;
    description: string;
    image: string;
}

export default function ServiceCard({
    title,
    description,
    image,
}: ServiceCardProps) {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            component={motion.div}
            variants={itemVariants}
        >
            <Box display={"flex"} flexDirection={"column"} gap={1} mb={4}>
                <Typography variant={"h5"}>{title}</Typography>
                <Typography variant={"body1"} color={"lightgray"}>
                    {description}
                </Typography>

                <EButton type="gradient" href="/contact" sx={{ mt: 2, p: 2 }}>
                    Hire me
                </EButton>
            </Box>
            <Image
                src={image}
                alt={title}
                width={0}
                height={0}
                sizes="100wv"
                style={{ height: "auto", width: "auto", objectFit: "cover" }}
            />
        </Box>
    );
}
