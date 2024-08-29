import { Box, Skeleton } from "@mui/material";

export default function AdminDashboardStatsLoading() {
    return (
        <Box
            bgcolor={"secondary.main"}
            width={"25%"}
            borderRadius={1}
            p={1}
            height={"20%"}
            display={"flex"}
            flexDirection={"column"}
            gap={1}
        >
            <Box>
                <Skeleton variant="text" width="60%" />
            </Box>
            <Box
                bgcolor={"primary.main"}
                display={"flex"}
                textAlign={"center"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"85%"}
                borderRadius={1}
            >
                <Skeleton variant="text" width="80%" height="50%" />
            </Box>
        </Box>
    );
}
