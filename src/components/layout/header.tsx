import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import GradientText from "../ui/gradient-text";
import { Icon } from "@iconify/react/dist/iconify.js";
import ContentWrapper from "../ui/content-wrapper";
import Link from "next/link";
import EButton from "../ui/ebutton";
import styles from "@/styles/page.module.css";
import { containerVariants } from "../utils/animations";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
    const links = [
        { title: "Home", link: "/" },
        { title: "Services", link: "/services" },
        { title: "Projects", link: "/projects" },
        { title: "About", link: "/about" },
        { title: "Blog", link: "/blog" },
    ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const drawerMenu = (
        <Box
            width={200}
            bgcolor={"secondary.main"}
            onClick={() => setIsMenuOpen(false)}
        >
            <List>
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
            </List>
        </Box>
    );
    return (
        <ContentWrapper sx={{ pt: 0, pb: 0 }} content>
            <Drawer
                anchor="right"
                open={isMenuOpen}
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
                height={"12dvh"}
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
                <div className={styles.animatedComponent}></div>
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
                    display={{ xs: "none", md: "block" }}
                    color="text.primary"
                >
                    <EButton type="white" href="/contact">
                        Let&apos;s Talk
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
                    >
                        <Icon icon="ri:menu-3-fill" color="#fff" height={22} />{" "}
                    </IconButton>
                </Box>
            </Box>
        </ContentWrapper>
    );
}
