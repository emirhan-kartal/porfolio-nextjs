import AdminLayout from "@/components/composites/admin/admin-layout";
import AdminContentForm from "@/components/ui/admin-content-form";
import { fetcher } from "@/components/utils/fetcher";
import { getDatabase } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Blog } from "@/pages/blog";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();
    const { query } = router;
    console.log(query.id)
    const { data, error, isLoading } = useSWR(
        "/api/blogs/" + query.id,
        fetcher
    );
    if (error) {
        return <div>Error</div>;
    }

    return (
        <AdminLayout>
            <Typography component={"h1"} variant="h5">
                Edit the blog post, {session?.user?.email}
            </Typography>

            <AdminContentForm
                content={data}
                type="blogs"
                isLoading={isLoading}
            />
        </AdminLayout>
    );
}
export async function getServerSideProps(context: any) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

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
