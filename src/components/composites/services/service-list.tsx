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
import { useTranslations } from "next-intl";

export default function ServiceList() {
    const t = useTranslations("services");
    const services = [
        {
            title: t("service-1-title"),
            description: t("service-1-description"),
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
