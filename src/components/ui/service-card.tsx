import { Box, Typography } from "@mui/material";
import Image from "next/image";
import EButton from "./ebutton";
import { motion } from "framer-motion";
import { itemVariants } from "../utils/animations";
import { useTranslations } from "next-intl";
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
    const t = useTranslations("service-card");
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
                    {t('button')}
                </EButton>
            </Box>
            <Image
                src={image}
                alt={title}
                width={0}
                height={0}
                sizes="100wv"
                style={{ height: "auto", width: "500px", objectFit: "cover" }}
            />
        </Box>
    );
}
