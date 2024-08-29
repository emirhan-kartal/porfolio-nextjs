import { Box, Typography } from "@mui/material";
import { fetcher } from "../utils/fetcher";
import useSWR from "swr";
import { Suspense } from "react";
import AdminDashboardStatsLoading from "./admin-dashboard-stats-loading";

interface AdminDashboardStatsProps {
    apiRoute: string;
    title: string;
}

export default function AdminDashboardStats({
    apiRoute,
    title,
}: AdminDashboardStatsProps) {
    const { data, error, isLoading } = useSWR(apiRoute, fetcher);
    console.log(data);
    return (
        <Suspense fallback={<AdminDashboardStatsLoading />}>
            <Box
                bgcolor={"secondary.main"}
                width={"33%"}
                borderRadius={1}
                height={150}
                p={1}
                display={"flex"}
                flexDirection={"column"}
                gap={1}
            >
                <Box>
                    <Typography variant={"h6"} fontSize={16}>
                        {title}
                    </Typography>
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
                    <Typography variant={"h4"} fontSize={24}>
                        {data?.value}
                    </Typography>
                </Box>
            </Box>
        </Suspense>
    );
}
