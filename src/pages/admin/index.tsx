import AdminLayout from "@/components/composites/admin/admin-layout";
import { Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Page() {
    const { data: session } = useSession();

    if (typeof window === null) return null;

    return (
        <AdminLayout>
            <Typography>
                Welcome to the admin panel, {session?.user?.email}
                This is for projects
            </Typography>
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
