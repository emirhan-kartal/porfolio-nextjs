import {
    List,
    ListSubheader,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
} from "@mui/material";
import { signOut } from "next-auth/react";
import router from "next/router";

export default function AdminNav() {
    return (
        <Box minHeight={"100vh"} height={"100%"}>
            <List
                component={"nav"}
                sx={{ height: "100%" }}
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{
                            bgcolor: "secondary.main",
                            fontSize: "1.1rem",
                        }}
                    >
                        Admin Panel
                    </ListSubheader>
                }
            >
                <ListItem>
                    <ListItemButton
                        color="text.primary"
                        onClick={() => router.push("/admin")}
                    >
                        <ListItemText>Dashboard</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        color="text.primary"
                        onClick={() => router.push("/admin/blogs")}
                    >
                        <ListItemText>Blogs</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        color="text.primary"
                        onClick={() => router.push("/admin/projects")}
                    >
                        <ListItemText>Projects</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        color="text.primary"
                        onClick={() => router.push("/admin/skills")}
                    >
                        <ListItemText>Skills</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        color="text.primary"
                        onClick={() => router.push("/admin/faq")}
                    >
                        <ListItemText>FAQ</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{ mt: "full", position: "relative" }}>
                    <ListItemButton
                        color="text.primary"
                        onClick={async () => await signOut()}
                    >
                        <ListItemText>Sign Out</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}
