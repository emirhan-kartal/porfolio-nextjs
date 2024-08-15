import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function AdminInfo() {
    const { data: session } = useSession();
    return (
        <Box display={"flex"} gap={1}>
            <Box
                height={35}
                width={35}
                borderRadius={"40px"}
                bgcolor={"primary.main"}
            />
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"space-evenly"}
            >
                <Typography
                    fontSize={"0.7rem"}
                    color="lightgray"
                    fontWeight={"bold"}
                >
                    {session?.user?.name}
                </Typography>
                <Typography
                    variant={"subtitle1"}
                    color="darkgray"
                    fontSize={"0.6rem"}
                >
                    Admin
                </Typography>
            </Box>
        </Box>
    );
}
