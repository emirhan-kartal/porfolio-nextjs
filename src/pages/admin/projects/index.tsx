import { Icon } from "@iconify/react/dist/iconify.js";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { Blog } from "../../blog";
import { authOptions } from "../../api/auth/[...nextauth]";
import AdminLayout from "@/components/composites/admin/admin-layout";
import { getDatabase } from "@/lib/db";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Page({ blogs }: { blogs: Blog[] }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <CircularProgress sx={{ color: "text.primary" }} />;
    }
    if (status === "unauthenticated") {
        return null;
    }
    const handleEdit = (params: any) => {
        router.push("edit?id=" + params.id);
    };
    const columns: GridColDef[] = [
        { field: "title", headerName: "Title", minWidth: 250, flex: 1 },
        { field: "author", headerName: "Author", minWidth: 100, flex: 1 },
        { field: "tags", headerName: "Tags", minWidth: 100, flex: 1 },
        {
            field: "date",
            headerName: "Date",
            type: "string",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            minWidth: 100,
            flex: 1,
            getActions: (params) => [
                <IconButton
                    key={params.id}
                    aria-label="edit"
                    size="small"
                    onClick={() => handleEdit(params)}
                >
                    <Icon icon="akar-icons:edit" />
                </IconButton>,
                <IconButton
                    key={params.row}
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDelete(params)}
                >
                    <Icon icon="material-symbols:delete-outline" />
                </IconButton>,
            ],
        },
    ];

    return (
        <AdminLayout>
            <Box display={"flex"}>
                <Typography>
                    Welcome to the admin panel This is for projects
                </Typography>
                <Box ml={"auto"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        href="projects/create"
                    >
                        Add a Project
                    </Button>
                </Box>
            </Box>
            <DataGrid
                getRowId={getRowId}
                rows={blogs}
                columns={columns}
                disableColumnSorting
                disableColumnFilter
                disableColumnMenu
                disableColumnResize
            />
        </AdminLayout>
    );
}
const getRowId = (row: any) => {
    return row._id;
};

const handleDelete = (params: any) => {
    console.log(params);
};

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
    const mongo = await getDatabase();
    const query = await mongo.collection("projects").find({}).toArray();
    const blogs = query.map((blog) => {
        console.log(blog);
        return {
            id: blog._id.toString(),
            title: blog.title,
            tags: blog.tags.split(","),
            date: blog.date,
            author: "Emirhan Kartal",
        };
    });

    return {
        props: { blogs, session },
    };
}
