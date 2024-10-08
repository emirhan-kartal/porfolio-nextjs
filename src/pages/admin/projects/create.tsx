import AdminLayout from "@/components/composites/admin/admin-layout";
import AdminContentForm from "@/components/ui/admin-content-form";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();
    return (
        <AdminLayout>
            <Typography component={"h1"} variant="h5">
                Create a new project, {session?.user?.email}
            </Typography>
            <AdminContentForm contentType="projects" />
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}
