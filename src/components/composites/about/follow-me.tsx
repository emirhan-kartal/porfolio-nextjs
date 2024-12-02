"use client";
import { Box, Divider, Theme, Typography, useMediaQuery } from "@mui/material";
import ContentWrapper from "../../ui/content-wrapper";
import Image from "next/image";
import GradientText from "../../ui/gradient-text";
import { containerVariants, itemVariants } from "@/components/utils/animations";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import GradientIcon from "@/components/ui/gradient-icon";
export default function FollowMe() {
    const mediaQuery = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up("md")
    );
    const width = mediaQuery ? 640 : "100%";
    const t = useTranslations("follow-me");
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
                            objectFit: "cover",
                        }}
                    />
                </Box>
                <Box
                    left={{ xs: "50%", md: "400px" }}
                    sx={{
                        transform: {
                            xs: "translateX(-50%)",
                            md: "translateY(-50%)",
                        },
                        top: { xs: -50, md: "50%" },
                    }}
                    position={{ xs: "relative", md: "absolute" }}
                >
                    <Box
                        bgcolor={"text.primary"}
                        width={{ xs: "85%", md: "400px" }}
                        p={4}
                        mx={"auto"}
                        component={motion.div}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Box component={motion.div} variants={itemVariants}>
                            <GradientText>{t("title")}</GradientText>
                        </Box>
                        <Typography
                            color={"darkgray"}
                            gutterBottom
                            component={motion.div}
                            variants={itemVariants}
                        >
                            {t("about")}
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
                                <Box
                                    display={"flex"}
                                    gap={1}
                                    justifyContent={"end"}
                                    alignItems={"center"}
                                >
                                    <Typography
                                        variant={"h5"}
                                        color={"primary.main"}
                                        mr={"auto"}
                                    >
                                        {t("social")}
                                    </Typography>
                                    <GradientIcon
                                        icon={"akar-icons:github-fill"}
                                        link={
                                            "https://github.com/emirhankartal"
                                        }
                                    />
                                    <GradientIcon
                                        icon={"akar-icons:linkedin-fill"}
                                        link={
                                            "https://www.linkedin.com/in/emirhan-kartal-612ab618a/"
                                        }
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ContentWrapper>
    );
}
