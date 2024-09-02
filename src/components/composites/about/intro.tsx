import { Box, Grid, Typography } from "@mui/material";
import ContentWrapper from "../../ui/content-wrapper";
import Gallery from "../../ui/gallery";
import GradientIcon from "../../ui/gradient-icon";
import GradientText from "../../ui/gradient-text";
import { motion } from "framer-motion";
import {
    container,
    containerVariants,
    itemVariants,
    itemWithDelay,
} from "@/components/utils/animations";
import { useTranslations } from "next-intl";

export default function AboutIntro() {
    const t= useTranslations("about")
    return (
        <ContentWrapper content>
            <Box
                display={"flex"}
                flexDirection={"column"}
                gap={{ xs: 3, sm: 3, md: 8 }}
            >
                <Grid container xs={12} md={6}>
                    <Grid
                        item
                        display={"flex"}
                        flexDirection={"column"}
                        component={motion.div}
                        variants={container("wo-delay")} // because if delay, it will look like its slow
                        initial="hidden"
                        animate="visible"
                    >
                        <Typography
                            component={motion.div}
                            variants={itemVariants}
                            variant={"h4"}
                            sx={{
                                fontSize: {
                                    xs: "2rem",
                                    sm: "3rem",
                                    md: "4rem",
                                },
                            }}
                        >
                            {t('me')}
                        </Typography>
                        <Box component={motion.div} variants={itemVariants}>
                            <GradientText
                                sx={{
                                    fontSize: {
                                        xs: "2.5rem",
                                        sm: "3.5rem",
                                        md: "4rem",
                                    },
                                    marginBottom: 1,
                                }}
                            >
                                Emirhan Kartal
                            </GradientText>
                        </Box>
                        <Typography
                            component={motion.div}
                            variants={itemVariants}
                        >
                            {t('detail')}
                        </Typography>

                        <Box
                            display={"flex"}
                            mt={{ xs: 3, sm: 4, md: 5 }}
                            mb={{ xs: 1, sm: 2, md: 0 }}
                            gap={2}
                            component={motion.div}
                            variants={itemWithDelay(1.5)}
                        >
                            <GradientIcon
                                icon={"akar-icons:github-fill"}
                                link={"https://github.com/emirhankartal"}
                            />
                            <GradientIcon
                                icon={"akar-icons:linkedin-fill"}
                                link={
                                    "https://www.linkedin.com/in/emirhankartal/"
                                }
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    component={motion.div}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Box component={motion.div} variants={itemWithDelay(2)}>
                        <Gallery />
                    </Box>
                </Box>
            </Box>
        </ContentWrapper>
    );
}
