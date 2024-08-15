import { Grid, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { itemVariants } from "../utils/animations";
import Image from "next/image";
import useResponsiveImage from "../hooks/useResponsiveImage";
import { Skill } from "../composites/landing-about";

export default function WhatIdoCard({ skill }: { skill: Skill }) {
    const condition = (x: number) =>
        x < 350 ? 60 : x < 400 ? 80 : x < 600 ? 100 : x < 900 ? 120 : 100;
    const { imageResolution, ref } = useResponsiveImage(condition);

    return (
        <Grid
            item
            xs={6}
            md={4}
            style={{ aspectRatio: "1/1" }}
            ref={ref}
            component={motion.div}
            variants={itemVariants}
        >
            <Box
                display={"flex"}
                bgcolor={"primary.main"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                height={"100%"}
            >
                <Image
                    src={skill.image}
                    alt={skill.title}
                    width={imageResolution}
                    height={imageResolution}
                />
                <Typography
                    mt="32px"
                    fontSize={{
                        xs: "1.2rem",
                        sm: "1.5rem",
                        md: "1.8rem",
                        lg: "2rem",
                    }}
                >
                    {skill.title}
                </Typography>
            </Box>
        </Grid>
    );
}
