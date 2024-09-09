import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import GradientText from "../../ui/gradient-text";
import { Icon } from "@iconify/react/dist/iconify.js";
import ContentWrapper from "../../ui/content-wrapper";
import Link from "next/link";
import EButton from "../../ui/ebutton";
import { containerVariants } from "../../utils/animations";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/ui/language-switcher";

export default function Header() {
    const t = useTranslations("header");

    const links = t //to prevent layout shift
        ? [
              { title: t("home"), link: `/` },
              { title: t("services"), link: `/services` },
              { title: t("projects"), link: `/projects` },
              { title: t("about"), link: `/about` },
              { title: t("blog"), link: `/blog` },
              { title: t("contact"), link: "/contact" },
          ]
        : [
              { title: "home", link: `/` },
              { title: "services", link: `/services` },
              { title: "projects", link: `/projects` },
              { title: "about", link: `/about` },
              { title: "blog", link: `/blog` },
              { title: "contact", link: "/contact" },
          ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const drawerMenu = (
        <Box
            width={200}
            bgcolor={"secondary.main"}
            onClick={() => setIsMenuOpen(false)}
          
        >
            <List >
                {links.map((link, index) => {
                    return (
                        <ListItem key={index}>
                            <Link href={link.link}>
                                <ListItemText
                                    sx={{
                                        transition: "font-size 0.3s",
                                        "&:hover": {
                                            fontSize: "1.2rem",
                                        },
                                    }}
                                    primary={link.title}
                                />
                            </Link>
                        </ListItem>
                    );
                })}
                <ListItem>
                    <LanguageSwitcher />
                </ListItem>
            </List>
        </Box>
    );
    return (
        <ContentWrapper sx={{ pt: 0, pb: 0, minHeight: "10vh" }} content>
            
            <Drawer
                anchor="right"
                open={isMenuOpen}
                sx={{fontFamily:"inherit"}}
                PaperProps={{
                    sx: {
                        width: 200,
                        padding: 2,
                    },
                }}
                onClose={() => setIsMenuOpen(false)}
            >
                {drawerMenu}
            </Drawer>
            <Box
                height={"10vh"}
                bgcolor={"primary.main"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                component={motion.div}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Link href={"/"}>
                    <GradientText
                        sx={{
                            transition: "font-size 0.3s",
                            "&:hover": {
                                fontSize: "2rem",
                            },
                        }}
                    >
                        Emirhan
                    </GradientText>
                </Link>
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        gap: 4,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        ml: 8,
                    }}
                >
                    {links.map((link, index) => {
                        return (
                            <Link key={index} href={link.link}>
                                <Typography
                                    sx={{
                                        transition: "font-size 0.3s",
                                        "&:hover": {
                                            fontSize: "1.2rem",
                                        },
                                    }}
                                >
                                    {link.title}
                                </Typography>
                            </Link>
                        );
                    })}
                </Box>

                <Box
                    ml={"auto"}
                    display={{ xs: "none", md: "flex" }}
                    alignItems={"center"}
                    color="text.primary"
                >
                    <Box ml={"auto"}>
                        <LanguageSwitcher />
                    </Box>{" "}
                    <EButton type="white" href="/contact">
                        {t("lets-talk")}
                    </EButton>
                </Box>
                <Box
                    ml={"auto"}
                    display={{ md: "none", color: "text.primary" }}
                >
                    <IconButton
                        aria-label="menu"
                        sx={{ display: { md: "none" } }}
                        onClick={() => setIsMenuOpen(true)}
                        disableRipple
                    >
                        <Icon icon="ri:menu-3-fill" color="#fff" height={22} />{" "}
                    </IconButton>
                </Box>
            </Box>
        </ContentWrapper>
    );
}
