import { Box, Typography } from "@mui/material";
import ContentWrapper from "../../ui/content-wrapper";
import ServiceCard from "../../ui/service-card";
import GradientText from "../../ui/gradient-text";
import { motion } from "framer-motion";
import {
    container,
    containerVariants,
    itemVariants,
} from "@/components/utils/animations";

export default function ServiceList() {
    const services = [
        {
            title: "Service 1",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            title: "Service 2",
            description:
                "lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            title: "Service 3",
            description:
                "lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
    ];
    return (
        <ContentWrapper content>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={container("wo-delay")}
            >
                <Box component={motion.div} variants={itemVariants}>
                    <GradientText sx={{ mb: 1.5, fontSize: "3rem" }}>
                        Our Services
                    </GradientText>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={10}
                    component={motion.div}
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} image="/me.png" />
                    ))}
                </Box>
            </motion.div>
        </ContentWrapper>
    );
}