import AdminLayout from "@/components/composites/admin/admin-layout";
import { Box, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import AdminDashboardStats from "@/components/ui/admin-dashboard-stats";

export default function Page() {
    const { data: session } = useSession();

    if (typeof window === null) return null;

    return (
        <AdminLayout>
            <Typography component={"h1"} variant="h5">
                Admin Dashboard, {session?.user?.email} Welcome
            </Typography>
            <Box display={"flex"} gap={2} width={"100%"}>
                <AdminDashboardStats
                    title="Skills"
                    apiRoute="/api/skills/count"
                />
                <AdminDashboardStats
                    title="Blogs"
                    apiRoute="/api/blogs/count"
                />
                <AdminDashboardStats
                    title="Projects"
                    apiRoute="/api/projects/count"
                />
            </Box>
        </AdminLayout>
    );
}
export async function getServerSideProps(context: any) {
    console.log("getServerSession STARTED");
    const serverSession = await getServerSession(
        context.req,
        context.res,
        authOptions
    );
    if (!serverSession) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}
