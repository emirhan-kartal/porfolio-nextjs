"use client";
import { Divider, Typography, useMediaQuery } from "@mui/material";
import ContentWrapper from "../../ui/content-wrapper";
import Image from "next/image";
import { Box, Theme } from "@mui/system";
import GradientText from "../../ui/gradient-text";
import { containerVariants, itemVariants } from "@/components/utils/animations";
import { motion } from "framer-motion";
export default function FollowMe() {
    const mediaQuery = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up("md")
    );
    const width = mediaQuery ? 640 : "100%";

    return (
        <ContentWrapper content>
            <Box
                position={"relative"}
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Box mt={12} component={motion.div} variants={itemVariants}>
                    <Image
                        height={0}
                        width={0}
                        src={"/me.png"}
                        alt={"Emirhan Kartal"}
                        sizes="100wv"
                        style={{
                            height: "auto",
                            width: width,
                            objectFit:"cover",
                        }}
                    />
                </Box>
                <Box
                    bgcolor={"text.primary"}
                    width={{ xs: "85%", md: "400px" }}
                    left={{ xs: "50%", md: "400px" }}
                    sx={{
                        transform: {
                            xs: "translateX(-50%)",
                            md: "translateY(-50%)",
                        },
                        top: { xs: -50, md: "50%" },
                    }}
                    position={{ xs: "relative", md: "absolute" }}
                    component={motion.div}
                    variants={itemVariants}
                >
                    <Box
                        p={4}
                        mx={"auto"}
                        component={motion.div}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Box component={motion.div} variants={itemVariants}>
                            <GradientText>Follow me</GradientText>
                        </Box>
                        <Typography
                            color={"darkgray"}
                            gutterBottom
                            component={motion.div}
                            variants={itemVariants}
                        >
                            I&apos;m Emirhan, a developer who builds digital
                            products.
                        </Typography>
                        <Divider
                            sx={{
                                bgcolor: "primary.main",
                            }}
                            component={motion.div}
                            variants={itemVariants}
                        />
                        <Box
                            display={"flex"}
                            gap={2}
                            mt={1}
                            component={motion.div}
                            variants={itemVariants}
                        >
                            {/*only social media buttons*/}

                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                gap={1}
                                width={1}
                            >
                                <Typography
                                    variant={"h5"}
                                    color={"primary.main"}
                                >
                                    Social Media
                                </Typography>
                                <Box display={"flex"} gap={1}></Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ContentWrapper>
    );
}
