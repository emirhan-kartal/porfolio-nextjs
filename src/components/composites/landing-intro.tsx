import { Box, Typography } from "@mui/material";
import EButton from "../ui/ebutton";
import GradientText from "../ui/gradient-text";
import Image from "next/image";
import ContentWrapper from "../ui/content-wrapper";
import { domMax, LazyMotion, m } from "framer-motion";
import { container, itemVariants } from "../utils/animations";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

export default function LandingIntro() {
    const t = useTranslations("landing-intro");
    const { locale, locales } = useRouter();
    const otherLocale = locales?.find((loc) => loc !== locale);

    const widthSettings = {
        small: {
            fontSize: { xs: "2.3rem", md: "2.8rem" },
            hi_2_fontSize: { xs: "2.2rem", md: "2.8rem" },
            textFontSize: 14,
            imageWidth: 150,
            imageHeight: 150,
        },
        regular: {
            fontSize: { xs: "3rem", md: "3.5rem" },
            hi_2_fontSize: { xs: "2.45rem", md: "2.8rem" },

            textFontSize: 16,
            imageWidth: 180,
            imageHeight: 180,
        },
    };

    const [isSmallDevice, setIsSmallDevice] = useState(false);
    const chosenWidthSettings = isSmallDevice
        ? widthSettings.small
        : widthSettings.regular;
    useEffect(() => {
        if (typeof window !== "undefined") {
            var handler = () => {
                setIsSmallDevice(
                    window.innerWidth < 400 ||
                        (window.innerHeight < 800 && !(window.innerWidth > 900))
                );
            };
            handler();
            window.addEventListener("resize", handler);
        }
        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", handler);
            }
        };
    }, []);
    return (
        <ContentWrapper sx={{ p: 0, minHeight: "90svh" }} content>
            <LazyMotion features={domMax}>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    height={"90svh"}
                    gap={3}
                    component={m.div}
                    variants={container("wo-delay")}
                    initial="hidden"
                    animate="visible"
                >
                    <Box
                        borderRadius={"100%"}
                        height={chosenWidthSettings.imageHeight}
                        width={chosenWidthSettings.imageWidth}
                        component={m.div}
                        variants={itemVariants}
                        sx={{
                            "&:hover": {
                                transform: "rotate(360deg)",
                                transition: "transform 0.5s",
                            },
                        }}
                    >
                        <Image
                            src="/me.jpg"
                            alt="Vercel Logo"
                            loading="eager"
                            priority={true}
                            width={chosenWidthSettings.imageWidth}
                            height={chosenWidthSettings.imageHeight}
                            style={{ borderRadius: "100%" }}
                        />
                    </Box>
                    <Box
                        textAlign={{ xs: "start", sm: "center" }}
                        component={m.div}
                        variants={itemVariants}
                    >
                        <GradientText
                            sx={{
                                fontSize: chosenWidthSettings.fontSize,
                                fontWeight: "bold",
                            }}
                        >
                            {t("hi-1")}
                        </GradientText>
                        <Typography
                            fontSize={
                                isSmallDevice
                                    ? chosenWidthSettings.hi_2_fontSize
                                    : chosenWidthSettings.fontSize
                            }
                            
                            variant="h1"
                        >
                            {t("hi-2")}
                        </Typography>
                        <Typography
                            variant="h2"
                            fontSize={chosenWidthSettings.fontSize}
                            display={{ xs: "none", sm: "block" }}
                        >
                            {t("hi-3")}
                        </Typography>
                    </Box>
                    <Typography
                        fontSize={chosenWidthSettings.textFontSize}
                        component={m.div}
                        variants={itemVariants}
                        variant="h3"
                    >
                        {t("what-i-do")}
                    </Typography>

                    <Box
                        display={"flex"}
                        flexDirection={{ xs: "column", sm: "row" }}
                        alignItems={{ sm: "center" }}
                        mr={{ xs: "auto", sm: 0 }}
                        gap={2}
                        component={m.div}
                        variants={itemVariants}
                    >
                        <EButton
                            type="white"
                            width="210px"
                            height="4rem"
                            href="/contact"
                        >
                            {t("contact")}
                        </EButton>
                        <EButton
                            type="black"
                            width="240px"
                            height="4rem"
                            href="/projects"
                        >
                            {t("projects")}
                        </EButton>
                    </Box>
                </Box>
            </LazyMotion>
        </ContentWrapper>
    );
}
