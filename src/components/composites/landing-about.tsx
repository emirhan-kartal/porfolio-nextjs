import { Grid, Typography } from "@mui/material";
import GradientText from "../ui/gradient-text";
import ContentWrapper from "../ui/content-wrapper";
import { motion } from "framer-motion";
import {
    container,
    containerVariants,
    itemVariants,
} from "../utils/animations";
import WhatIdoCard from "../ui/whatido-card";
import CTA from "../ui/cta";

export interface Skill {
    title: string;
    image: string;
}

const LandingAbout = ({ whatIdo }: { whatIdo: Skill[] }) => {
    return (
        <ContentWrapper sx={{ bgcolor: "secondary.main" }}>
            <Grid
                container
                width={{ xs: "90%", md: "85%" }}
                rowGap={3}
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Grid
                    item
                    xs={12}
                    mb={1}
                    component={motion.div}
                    variants={itemVariants}
                >
                    <GradientText sx={{ fontSize: "28px" }}>
                        Emirhan Kartal
                    </GradientText>
                </Grid>
                <Grid
                    item
                    xs={12}
                    mb={3}
                    component={motion.div}
                    variants={itemVariants}
                >
                    <Typography variant="h4">
                        A Solution Oriented Developer
                    </Typography>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={5}
                    mr={2}
                    component={motion.div}
                    variants={itemVariants}
                >
                    <Typography fontSize={18}>
                        Striving to become a successful Developer, his journey
                        commenced in 2014 at the age of 12, experimenting with
                        &apos;Skript&apos; a Python-like scripting language for
                        Minecraft. Addressing performance concerns, he
                        transitioned to Java, mastering the Bukkit API, a
                        Minecraft-specific interface.
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={5}
                    component={motion.div}
                    variants={itemVariants}
                >
                    <Typography fontSize={18}>
                        He published free plugins in the community.With a
                        passion for programming as a longtime hobby, he aspires
                        to excel as developer. Presently, he&apos;s immersed in
                        Fullstack projects
                    </Typography>
                </Grid>

                <Grid
                    item
                    xs={12}
                    component={motion.div}
                    variants={itemVariants}
                >
                    <Typography variant="h4">What I Do</Typography>
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    md={9}
                    spacing={2}
                    rowGap={2}
                    component={motion.div}
                    variants={container("w-delay", 3.2)}
                    initial="hidden"
                    animate="visible"
                >
                    {whatIdo ? (
                        whatIdo.map((skill, index) => (
                            <WhatIdoCard skill={skill} key={index} />
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </Grid>
                <CTA mt={6} />
            </Grid>
        </ContentWrapper>
    );
};

export default LandingAbout;
