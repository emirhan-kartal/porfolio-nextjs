import { Box, Divider, Typography } from "@mui/material";
import GradientText from "../../ui/gradient-text";
import ContentWrapper from "../../ui/content-wrapper";
import TimelineItem from "../../ui/timeline-item";
import { motion } from "framer-motion";
import { containerVariants } from "@/components/utils/animations";
import { useTranslations } from "next-intl";
interface TimelineProps {
    type: "work-info" | "education-info";
}
export default function Timeline({ type }: TimelineProps) {
    const t = useTranslations("education");
    const t2 = useTranslations("work");
    const educationInfo = [
        {
            title: t("university"),
            subtitle: t("degree"),
            date: "2021-2025",
        },
        {
            title: t("high-school"),
            subtitle: t("high-school-degree"),
            date: "2018-2020",
        },
        {
            title: t("high-school-2"),
            subtitle: t("high-school-degree-2"),
            date: "2016-2018",
        },
    ];
    const WorkExperience = [
        {
            title: t2('experience-1'),
            subtitle: "Gosocial Development",
            date: "05/2024 - 07/2024",
        },
        {
            title: t2('experience-2'),
            subtitle: t2('experience-2-detail'),
            date: "2021 - 2022",
        },
    ];

    const timelineData =
        type === "education-info" ? educationInfo : WorkExperience;

    return (
        <ContentWrapper>
            <GradientText sx={{ fontSize: 32, mb: 1.2 }}>
                {type === "education-info" ? t("title") : t2("title")}
            </GradientText>
            <Box
                display={"flex"}
                flexDirection={"column"}
                gap={{ xs: 3, md: 5 }}
                width={{ xs: "auto", md: "60%" }}
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {timelineData.map((item, index) => (
                    <>
                        <TimelineItem
                            title={item.title}
                            subtitle={item.subtitle}
                            date={item.date}
                        />
                        {index !== timelineData.length - 1 && <Divider />}
                    </>
                ))}
            </Box>
        </ContentWrapper>
    );
}
