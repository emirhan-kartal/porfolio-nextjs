import { Box, Typography } from "@mui/material";
import EButton from "../ui/ebutton";
import GradientText from "../ui/gradient-text";
import Image from "next/image";
import ContentWrapper from "../ui/content-wrapper";
import SimpleFramer from "../ui/simple-framer";
import { motion } from "framer-motion";
import { container, containerVariants, itemVariants } from "../utils/animations";

export default function LandingIntro() {
    const variant = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
    };
    return (
        <ContentWrapper sx={{ pt: 0 }} content>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                gap={3}
                component={motion.div}
                variants={container("wo-delay")}
                initial="hidden"
                animate="visible"
            >
                <Box
                    borderRadius={"100%"}
                    height={180}
                    width={180}
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
                        width={180}
                        height={180}
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
                            fontSize: { xs: "48px", sm: "56px" },
                            fontWeight: "bold",
                        }}
                    >
                        Hi I&apos;m Emirhan,
                    </GradientText>
                    <Typography fontSize={{ xs: "48px", sm: "56px" }}>
                        a Frontend Developer
                    </Typography>
                    <Typography
                        fontSize={{ xs: "48px", sm: "56px" }}
                        display={{ xs: "none", sm: "block" }}
                    >
                        based in Turkiye
                    </Typography>
                </Box>
                <Typography
                    fontSize={16}
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
                    <EButton type="white" width="210px" height="4rem">
                        GET IN TOUCH
                    </EButton>
                    <EButton type="black" width="240px" height="4rem">
                        VIEW ALL WORKS
                    </EButton>
                </Box>
            </Box>
        </ContentWrapper>
    );
}
