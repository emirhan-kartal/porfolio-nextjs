import AdminLayout from "@/components/composites/admin/admin-layout";
import { CircularProgress, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);
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
    const serverSession = await getServerSession(context.req, context.res, {});
    return {
        props: {
            session: serverSession,
        },
    };
}
