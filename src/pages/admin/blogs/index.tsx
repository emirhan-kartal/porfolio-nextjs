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
import { useState } from "react";

export default function Page({ blogs }: { blogs: Blog[] }) {
    const { data: session, status } = useSession();
    const [rows, setRows] = useState(
        blogs.map((blog) => {
            return {
                id: blog.id,
                title: blog.title,
                tags: blog.tags,
                date: blog.date,
                author: blog.author,
            };
        })
    );
    if (status === "loading") {
        return <CircularProgress sx={{ color: "text.primary" }} />;
    }
    if (status === "unauthenticated") {
        return null;
    }
    const handleEdit = (params: any) => {
        console.log(params);
    };
    const handleDelete = async (params: any) => {
        console.log(params.id);
        const result = await fetch("/api/blogs?id=" + params.id, {
            method: "DELETE",
        });
        if (result.ok) {
            setRows((prev) => {
                return prev.filter((row) => row.id !== params.id);
            });
            alert("Success");
        } else {
            alert(result.statusText);
        }
        console.log(params);
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
                    Welcome to the admin panel This is for blogs
                </Typography>
                <Box ml={"auto"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        href="blogs/create"
                    >
                        Add Blog
                    </Button>
                </Box>
            </Box>
            <DataGrid
                rows={rows}
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
    const blogs = (await mongo.collection("blogs").find().toArray()).map(
        (blog) => {
            return {
                ...blog,
                id: blog._id.toString(),
                _id: blog._id.toString(),
            };
        }
    );
    console.log(blogs);
    return {
        props: { blogs, session },
    };
}
