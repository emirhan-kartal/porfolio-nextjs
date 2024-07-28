import { Box, Grid, Typography } from "@mui/material";
import GradientText from "../ui/gradient-text";
import Image from "next/image";
import Link from "next/link";
import ContentWrapper from "../ui/content-wrapper";
import { motion } from "framer-motion";
import { container, containerVariants, itemVariants } from "../utils/animations";

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
                    variants={container("w-delay",3.2)}
                    initial="hidden"
                    animate="visible"
                >
                    {whatIdo ? (
                        whatIdo.map((skill, index) => (
                            <Grid
                                item
                                xs={6}
                                md={4}
                                height={240}
                                key={index}
                                component={motion.div}
                                variants={itemVariants}
                            >
                                <Box
                                    display={"flex"}
                                    bgcolor={"primary.main"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    height={240}
                                >
                                    <Image
                                        src={skill.image}
                                        alt={skill.title}
                                        width={100}
                                        height={100}
                                    />
                                    <Typography mt="32px" fontSize={"24px"}>
                                        {skill.title}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </Grid>
                <Box mt={6} component={motion.div} variants={itemVariants}>
                    <Typography fontSize={"29px"} mb={3}>
                        See the impact of good development practices on your
                        business.
                    </Typography>
                    <Link href={""}>
                        <GradientText
                            sx={{
                                fontSize: { xs: 32, md: 72 },
                                WebkitTextDecorationLine: "underline",
                            }}
                            underline={true}
                        >
                            Let&apos;s Work Together{" "}
                        </GradientText>
                    </Link>
                </Box>
            </Grid>
        </ContentWrapper>
    );
};

export default LandingAbout;
