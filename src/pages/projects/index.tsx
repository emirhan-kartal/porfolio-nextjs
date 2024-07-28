import ContentWrapper from "@/components/ui/content-wrapper";
import ProjectContainer from "@/components/ui/project-container";
import { Project } from "@/components/layout/featured-projects";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import GradientText from "@/components/ui/gradient-text";
import { container, containerVariants } from "@/components/utils/animations";
export default function Page() {
    const projects: Project[] = [
        {
            title: "Project 1",
            description: "This is project 1",
            image: "https://via.placeholder.com/300",
            link: "https://google.com",
            tags: ["tag1", "tag2"],
        },
        {
            title: "Project 2",
            description: "This is project 2",
            image: "https://via.placeholder.com/300",
            link: "https://google.com",
            tags: ["tag1", "tag2"],
        },
        {
            title: "Project 3",

            description: "This is project 3",
            image: "https://via.placeholder.com/300",
            link: "https://google.com",
            tags: ["tag1", "tag2"],
        },
    ];

    return (
        <ContentWrapper content>
            <motion.div
                variants={container("w-delay")}
                initial="hidden"
                animate="visible"
            >
                <GradientText sx={{ fontSize: "3rem", mb: 2 }}>
                    My Projects
                </GradientText>
            </motion.div>
            <ProjectContainer projects={projects} />
        </ContentWrapper>
    );
}
