import { Box, Divider, Grid, Typography } from "@mui/material";
import GradientIcon from "../../ui/gradient-icon";
import Link from "next/link";
import ContentWrapper from "../../ui/content-wrapper";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

export default function Footer({ className = "" }: { className?: string }) {
    const t = useTranslations("header");
    const tFooter = useTranslations("footer");
    const { locale, route } = useRouter();
    const navLinks = [
        { title: t("home"), link: `/` },
        { title: t("about"), link: `/about` },
        { title: t("contact"), link: `/contact` },
    ];
    if (route.includes("admin")) return null;
    return (
        <ContentWrapper sx={{ pb: 0, pt: 0 }}>
            <Box
                position={"relative"}
                bottom={0}
                height={370}
                width={{ xs: "90%", md: "85%" }}
                paddingTop={{ xs: 8 }}
                className={className}
                component={"footer"}
            >
                <Divider
                    aria-hidden="true"
                    sx={{ height: 2, bgcolor: "white", mb: 8 }}
                />
                <Grid item container spacing={4} xs={12}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        component={Typography}
                        variant="h5"
                        color={"text.secondary"}
                        order={{ md: 1 }}
                    >
                        Emirhan.
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        component={Typography}
                        color="text.primary"
                        sx={{ order: { md: 3 } }}
                        mt={{ xs: 0, md: "auto" }} // because it doesnt align with the cross element
                    >
                        {tFooter("developed-by")}
                    </Grid>

                    <Grid
                        item
                        display={"flex"}
                        gap={6}
                        xs={12}
                        md={6}
                        sx={{
                            justifyContent: { md: "flex-end" },
                            order: { md: 2 },
                        }}
                    >
                        {navLinks.map((nav) => (
                            <Link href={nav.link} key={nav.link}>
                                <Typography
                                    color={"text.primary"}
                                    fontWeight={{ xs: "600", md: "normal" }}
                                >
                                    {nav.title}
                                </Typography>
                            </Link>
                        ))}
                    </Grid>
                    <Grid
                        item
                        display={"flex"}
                        gap={2}
                        xs={12}
                        md={6}
                        justifyContent={{ md: "flex-end" }}
                        order={{ md: 4 }}
                    >
                        <GradientIcon
                            icon={"hugeicons:instagram"}
                            link="https://instagram.com"
                        />
                        <GradientIcon
                            icon={"hugeicons:instagram"}
                            link="https://instagram.com"
                        />
                    </Grid>
                </Grid>
            </Box>
        </ContentWrapper>
    );
}
