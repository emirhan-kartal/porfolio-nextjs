import AdminLayout from "@/components/composites/admin/admin-layout";
import AdminContentForm from "@/components/ui/admin-content-form";
import AdminBlogForm from "@/components/ui/admin-content-form";
import { getDatabase } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Typography } from "@mui/material";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default function Page({ blog }: { blog: any }) {
    const { data: session } = useSession();
    return (
        <AdminLayout>
            <Typography component={"h1"} variant="h5">
                Edit the blog post, {session?.user?.email}
            </Typography>
            <AdminContentForm content={blog} type="blogs"/>
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
    if (context.query.id) {
        const id = context.query.id;
        const mongo = await getDatabase();
        const blog = await mongo
            .collection("projects")
            .findOne({ _id: new ObjectId(id) });
        return {
            props: {
                blog,
            },
        };
    }
}
