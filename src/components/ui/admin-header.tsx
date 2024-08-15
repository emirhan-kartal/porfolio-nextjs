import { Box } from "@mui/material";
import GradientText from "./gradient-text";
import AdminInfo from "./admin-info";

export default function AdminHeader() {
    return (
        <>
            <Box
                component="header"
                display={"flex"}
                width={"100%"}
                height={"50px"}
                justifyContent={"space-between"}
                alignItems={"center"}
                px={2}
                bgcolor={"secondary.main"}
            >
                <GradientText>Emirhan</GradientText>
                <AdminInfo/>
            </Box>
        </>
    );
}
