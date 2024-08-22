import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import AdminLayout from "@/components/composites/admin/admin-layout";
import { getDatabase } from "@/lib/db";
import Link from "next/link";
import { useRouter } from "next/router";
import { Project } from "@/components/composites/featured-projects";
import useSWR from "swr";

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch");
    }
    return response.json();
};

export default function Page() {
    const router = useRouter();

    const { data, error, isLoading } = useSWR("/api/projects", fetcher);
    if (error) {
        return <div>Error</div>;
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
            <Box
            width={"100%"}
            height={"600px"}
            > 
                <DataGrid
                    loading={isLoading}
                    pageSizeOptions={[10, 15, 20]}
                    slotProps={{
                        loadingOverlay: {
                            variant: "skeleton",
                            noRowsVariant: "skeleton",
                            color: "secondary.main",
                        },
                    }}
                    getRowId={getRowId}
                    rows={data}
                    columns={columns}
                    disableColumnSorting
                    disableColumnFilter
                    disableColumnMenu
                    disableColumnResize
                />
            </Box>
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
    const projects = query.map((projects) => {
        return {
            _id: projects._id.toString(),
            title: projects.title,
            tags: projects.tags.split(","),
            date: projects.date,
            author: "Emirhan Kartal",
        };
    });

    return {
        props: { projects, session },
    };
}
