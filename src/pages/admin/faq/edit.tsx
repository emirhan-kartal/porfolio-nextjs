import AdminLayout from "@/components/composites/admin/admin-layout";
import AdminContentForm from "@/components/ui/admin-content-form";
import { fetcher } from "@/components/utils/fetcher";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Page() {
    const { data: session } = useSession();

    const router = useRouter();
    const { query } = router;

    const { data, error, isLoading } = useSWR(
        "/api/faq/" + query.id,
        fetcher
    );
    if (error) {
        return <div>Error</div>;
    }
    return (
        <AdminLayout>
            <Typography component={"h1"} variant="h5">
                Edit the project post, {session?.user?.email}
            </Typography>
            <AdminContentForm
                content={data}
                contentType="faq"
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
