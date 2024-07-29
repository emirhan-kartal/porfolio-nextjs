import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import EButton from "../ui/ebutton";
import GradientText from "../ui/gradient-text";
import Image from "next/image";
import ContentWrapper from "../ui/content-wrapper";
import SimpleFramer from "../ui/simple-framer";
import { motion } from "framer-motion";
import {
    container,
    containerVariants,
    itemVariants,
} from "../utils/animations";
import { useEffect, useState } from "react";

export default function LandingIntro() {
    const settings = {
        small: {
            fontSize: { xs: "2.5rem", md: "3rem" },
            textFontSize: 14,
            imageHeight: 150,
            imageWidth: 150,
        },
        regular: {
            fontSize: { xs: "3rem", md: "3.5rem" },
            textFontSize: 16,
            imageHeight: 180,
            imageWidth: 180,
        },
    };
    const [isSmallDevice, setIsSmallDevice] = useState(false);
    const chosenSettings = isSmallDevice ? settings.small : settings.regular;
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
        <ContentWrapper sx={{ p: 0 }} content>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                height={"90svh"}
                gap={3}
                component={motion.div}
                variants={container("wo-delay")}
                initial="hidden"
                animate="visible"
            >
                <Box
                    borderRadius={"100%"}
                    height={chosenSettings.imageHeight}
                    width={chosenSettings.imageWidth}
                    component={motion.div}
                    variants={itemVariants}
                    sx={{
                        "&:hover": {
                            transform: "rotate(360deg)",
                            transition: "transform 0.5s",
                        },
                    }}
                >
                    <Image
                        src="/me.png"
                        alt="Vercel Logo"
                        priority={true}
                        width={chosenSettings.imageWidth}
                        height={chosenSettings.imageHeight}
                        style={{ borderRadius: "100%" }}
                    />
                </Box>
                <Box
                    textAlign={{ xs: "start", sm: "center" }}
                    component={motion.div}
                    variants={itemVariants}
                >
                    <GradientText
                        sx={{
                            fontSize: chosenSettings.fontSize,
                            fontWeight: "bold",
                        }}
                    >
                        Hi I&apos;m Emirhan,
                    </GradientText>
                    <Typography fontSize={chosenSettings.fontSize}>
                        a Frontend Developer
                    </Typography>
                    <Typography
                        fontSize={chosenSettings.fontSize}
                        display={{ xs: "none", sm: "block" }}
                    >
                        based in Turkiye
                    </Typography>
                </Box>
                <Typography
                    fontSize={chosenSettings.textFontSize}
                    component={motion.div}
                    variants={itemVariants}
                >
                    I help businesses to build their digital products.
                </Typography>

                <Box
                    display={"flex"}
                    flexDirection={{ xs: "column", sm: "row" }}
                    alignItems={{ sm: "center" }}
                    mr={{ xs: "auto", sm: 0 }}
                    gap={2}
                    component={motion.div}
                    variants={itemVariants}
                >
                    <EButton
                        type="white"
                        width="210px"
                        height="4rem"
                        href="/contact"
                    >
                        GET IN TOUCH
                    </EButton>
                    <EButton
                        type="black"
                        width="240px"
                        height="4rem"
                        href="/projects"
                    >
                        VIEW ALL WORKS
                    </EButton>
                </Box>
            </Box>
        </ContentWrapper>
    );
}
