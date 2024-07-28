import { Grid, Typography } from "@mui/material";
import GradientText from "../ui/gradient-text";
import ProjectCard from "../ui/project-card";
import ContentWrapper, { contentWrapperSx } from "../ui/content-wrapper";
import { motion, useInView } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animations";
import { useRef } from "react";
import ProjectContainer from "../ui/project-container";

export type Project = {
    title: string;
    description: string;
    image: string;
    link: string;
    tags: string[];
};

const FeaturedProjects = ({ projects }: { projects: Project[] }) => {
    return (
        <ContentWrapper sx={{ pt: { xs: 3, md: 8 }, pb: 0 }} content>
            <Grid
                container
                columnSpacing={1}
                sx={{ ...contentWrapperSx, flexDirection: "row" }}
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Grid
                    item
                    xs={12}
                    component={motion.div}
                    variants={itemVariants}
                >
                    <Typography variant="h4">Look at My</Typography>
                    <GradientText sx={{ fontSize: { xs: 32, sm: 40 } }}>
                        Selected Works
                    </GradientText>
                </Grid>
                <Grid
                    item
                    xs={12}
                    mb={2}
                    component={motion.div}
                    variants={itemVariants}
                >
                    <Typography>
                        I make projects that will enchance my skillset into
                        reality.
                    </Typography>
                </Grid>

                <ProjectContainer projects={projects} />
            </Grid>
        </ContentWrapper>
    );
};

export default FeaturedProjects;
