import { Box, Grid, Pagination, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ProjectWithoutContent } from "../composites/featured-projects";
import { containerVariants, itemVariants } from "../utils/animations";
import { contentWrapperSx } from "./content-wrapper";
import ProjectCard from "./project-card";
import { useTranslations } from "next-intl";

export default function ProjectContainer({
    projects,
    paginate,
}: {
    projects: ProjectWithoutContent[];
    paginate?: number;
}) {
    console.log(projects, "projects");
    const t = useTranslations("project-container");
    return (
        <>
            <Grid
                container
                columnSpacing={1}
                sx={{ ...contentWrapperSx, flexDirection: "row" }}
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                rowGap={2}
                justifyContent={"start"}
            >
                {projects.map((project, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        key={index}
                        component={motion.div}
                        variants={itemVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <ProjectCard {...project} />
                        </motion.div>
                    </Grid>
                ))}
                {projects.length === 0 && (
                    <Typography>
                        {t("no-projects")}
                    </Typography>
                )}
            </Grid>
            {paginate && (
                <Box width="100%" display="flex" justifyContent="center">
                    <Pagination
                        count={Math.ceil((paginate - 2) / 5)}
                        color="primary"
                    />
                </Box>
            )}
        </>
    );
}
