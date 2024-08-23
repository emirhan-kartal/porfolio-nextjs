import { Grid, Typography } from "@mui/material";
import GradientText from "../ui/gradient-text";
import ContentWrapper, { contentWrapperSx } from "../ui/content-wrapper";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animations";
import ProjectContainer from "../ui/project-container";
import { ObjectId } from "mongodb";

export type Project = {
    _id: ObjectId;
    title: string;
    description: string;
    thumbnail: string;
    link: string;
    tags: string;
    content: string;
    date: string;

};
export type Blog = Project & { author: string };
export type ProjectWithoutContent = Omit<Project, "content">;

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
                        I make projects that will enhance my skillset into
                        reality.
                    </Typography>
                </Grid>

                <ProjectContainer projects={projects} />
            </Grid>
        </ContentWrapper>
    );
};

export default FeaturedProjects;
