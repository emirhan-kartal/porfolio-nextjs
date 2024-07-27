import { Box, Typography } from "@mui/material";
import ContentWrapper from "../../ui/content-wrapper";
import ServiceCard from "../../ui/service-card";
import GradientText from "../../ui/gradient-text";
import AnimatedComponent from "../../ui/animated-component";

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
        <ContentWrapper>
            
                <GradientText sx={{ mb: 1.5, fontSize: "48px" }}>
                    Our Services
                </GradientText>
                <Box display="flex" flexDirection="column" gap={10}>
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} image="/me.png" />
                    ))}
                </Box>
            
        </ContentWrapper>
    );
}
