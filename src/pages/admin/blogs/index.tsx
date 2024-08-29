import { Icon } from "@iconify/react/dist/iconify.js";
import {
    Box,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import AdminLayout from "@/components/composites/admin/admin-layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/components/utils/fetcher";

export default function Page() {
    const { data, error, isLoading } = useSWR("/api/blogs", fetcher);

    const [rows, setRows] = useState([]);
    useEffect(() => {
        if (!data) return;
        setRows(data.blogs);
    }, [data]);
    const router = useRouter();

    console.log(data);
    if (error) {
        console.log(error);
        return <div>Error</div>;
    }

    const handleEdit = (params: any) => {
        console.log(params);
        console.log("edit?id=" + params.id);
        router.push("blogs/edit?id=" + params.id);
    };
    const handleDelete = async (params: any) => {
        console.log(params.id);
        const rowsClone = [...rows];
        setRows((prev: any) => {
            return prev.filter((row: any) => row._id !== params.id);
        });
        const result = await fetch("/api/blogs?id=" + params.id, {
            method: "DELETE",
        });
        if (!result.ok) {
            setRows(rowsClone);
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
            <Box width={"100%"} height={"600px"}>
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
                    rows={rows}
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
