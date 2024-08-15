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
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Saepe optio dicta at fugit porro officia pariatur.
                        Saepe vero beatae tenetur vitae, praesentium deleniti
                        eos deserunt ipsum repellat cumque similique hic. Lorem,
                        ipsum dolor sit amet consectetur adipisicing elit. Iure
                        dolore soluta expedita qui eligendi vel suscipit tempore
                        veniam, facere harum.
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Pariatur deleniti ipsa quis iste ea? Porro, veritatis,
                        ad omnis tempora deleniti unde maxime dolorem nostrum
                        sequi numquam quas veniam totam delectus.
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
