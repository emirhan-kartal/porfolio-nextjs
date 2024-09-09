import { Grid, Typography } from "@mui/material";
import GradientText from "../ui/gradient-text";
import ContentWrapper, { contentWrapperSx } from "../ui/content-wrapper";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animations";
import ProjectContainer from "../ui/project-container";

import { useTranslations } from "next-intl";
import { Project } from "@/types";

const FeaturedProjects = ({ projects }: { projects: Project[] }) => {
    const t = useTranslations("featured-projects");

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
                minHeight={"20vh"}
            >
                <Grid
                    item
                    xs={12}
                    component={motion.div}
                    variants={itemVariants}
                >
                    <Typography variant="h4">{t("look-at-1")}</Typography>
                    <GradientText sx={{ fontSize: { xs: 32, sm: 40 } }}>
                        {t("look-at-2")}
                    </GradientText>
                </Grid>
                <Grid
                    item
                    xs={12}
                    mb={2}
                    component={motion.div}
                    variants={itemVariants}
                >
                    <Typography>{t("look-at-3")}</Typography>
                </Grid>

                <ProjectContainer projects={projects} getNextPage={undefined} />
            </Grid>
        </ContentWrapper>
    );
};

export default FeaturedProjects;
