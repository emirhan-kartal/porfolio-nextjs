import AdminLayout from "@/components/composites/admin/admin-layout";
import AdminContentForm from "@/components/ui/admin-content-form";
import { Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();
    return (
        <AdminLayout>
            <Typography component={"h1"} variant="h5">
                Create a new blog post, {session?.user?.email}
            </Typography>
            <AdminContentForm contentType="blog"  />
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getServerSession(context.req, context.res, {});

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
