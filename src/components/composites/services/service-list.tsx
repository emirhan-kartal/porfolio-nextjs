import { Box } from "@mui/material";
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
            title: "Web Development",
            description:
                "I build websites that are fast, secure, and easy to use. I use the latest technologies to create websites that are responsive and accessible.",
            image: "https://i.hizliresim.com/4t4hifc.jpg",
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
                        <ServiceCard key={index} {...service} />
                    ))}
                </Box>
            </motion.div>
        </ContentWrapper>
    );
}
