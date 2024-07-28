import { Box, Grid, Pagination } from "@mui/material";
import { motion } from "framer-motion";
import { Project } from "../layout/featured-projects";
import { containerVariants, itemVariants } from "../utils/animations";
import { contentWrapperSx } from "./content-wrapper";
import ProjectCard from "./project-card";

export default function ProjectContainer({
    projects,
}: {
    projects: Project[];
}) {
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
            </Grid>
            <Box width="100%" display="flex" justifyContent="center" >
                <Pagination count={1} color="primary" />
            </Box>
        </>
    );
}
