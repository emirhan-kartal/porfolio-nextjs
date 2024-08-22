import AdminLayout from "@/components/composites/admin/admin-layout";
import AdminContentForm from "@/components/ui/admin-content-form";
import { getDatabase } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Typography } from "@mui/material";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default function Page({ project }: { project: any }) {
    const { data: session } = useSession();
    return (
        <AdminLayout>
            <Typography component={"h1"} variant="h5">
                Edit the project post, {session?.user?.email}
            </Typography>
            <AdminContentForm content={project} type="projects" />
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
        const result = await mongo
            .collection("projects")
            .findOne({ _id: new ObjectId(id) });
        if (!result) {
            return {
                notFound: true,
            };
        }
        const project = {
            ...result,
            _id: result._id.toString(),
        };

        return {
            props: {
                project,
            },
        };
    }
}
