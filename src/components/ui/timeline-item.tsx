import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { itemVariants } from "../utils/animations";

interface TimelineItemProps {
    title: string;
    subtitle: string;
    date: string;
}

export default function TimelineItem({
    title,
    subtitle,
    date,
}: TimelineItemProps) {
    return (
        <Box
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            minWidth={300}
            component={motion.div}
            variants={itemVariants}
        >
            <Box
                display={{ md: "flex" }}
                flexDirection={{ md: "column" }}
                mb={{ xs: 3, md: 0 }}
            >
                <Typography color={"text.secondary"} fontSize={24}>
                    {title}
                </Typography>
                <Typography color={"lightgray"} fontSize={16}>
                    {subtitle}
                </Typography>
            </Box>
            <Box
                display={"flex"}
                alignItems={{ md: "flex-end" }}
                ml={{ md: "auto" }}
            >
                <Typography color={"lightgray"} fontSize={16}>
                    • {date}
                </Typography>
            </Box>
        </Box>
    );
}
