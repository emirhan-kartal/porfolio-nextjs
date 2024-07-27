import { Box, Divider, Typography } from "@mui/material";
import GradientText from "../../ui/gradient-text";
import ContentWrapper from "../../ui/content-wrapper";
import TimelineItem from "../../ui/timeline-item";
import AnimatedComponent from "../../ui/animated-component";
import { motion } from "framer-motion";
import { containerVariants } from "@/components/utils/animations";

export default function Timeline({type}:{type:string}) {
    const educationInfo = [
        {
            title: "Akdeniz University",
            subtitle: "Computer Programming",
            date: "2021-2025",
        },
        {
            title: "Sinav Private High School",
            subtitle: "Science",
            date: "2018-2020",
        },
        {
            title: "Kircilar High School",
            subtitle: "Information Technologies",
            date: "2016-2018",
        },
    ];
    const WorkExperience = [
        {
            title: "Frontend Developer",
            subtitle: "Gosocial Development",
            date: "05/2024 - 07/2024",
        },
        {
            title: "Personal Trainer",
            subtitle: "Self Employed",
            date: "2021 - 2022",
        },
    ];

    const timelineData = type === "education-info" ? educationInfo : WorkExperience;

    return (
        <ContentWrapper>

            
            <GradientText sx={{ fontSize: 32, mb: 1.2 }}>
                {type === "education-info" ? "Education" : "Work Experience"}
            </GradientText>
            <Box
                display={"flex"}
                flexDirection={"column"}
                gap={{xs:3,md:5}}
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
