import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import AdminLayout from "@/components/composites/admin/admin-layout";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useContext, useEffect, useState } from "react";
import { FAQuestionWithId, Project } from "@/types";
import { SnackbarContext } from "@/components/context/snackbarContext";

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

    const { data, error, isLoading } = useSWR("/api/faq", fetcher);
    const [rows, setRows] = useState<FAQuestionWithId[]>(data);
    const { showSnackbar } = useContext(SnackbarContext);
    useEffect(() => {
        if (!data) return;
        const enData = (data as FAQuestionWithId[]).map((project) => {
            return {
                ...project,
                ...project["en"],
            };
        });
        setRows(enData);
    }, [data]);

    if (error) {
        return <div>Error</div>;
    }

    const handleEdit = (params: any) => {
        router.push("faq/edit?id=" + params.id);
    };
    const handleDelete = async (params: any) => {
        const rowsClone = [...rows];
        setRows((prev: any) => {
            return prev.filter((row: any) => row._id !== params.id);
        });
        const result = await fetch("/api/faq?id=" + params.id, {
            method: "DELETE",
        });
        if (!result.ok) {
            setRows(rowsClone);
            showSnackbar("Failed to delete", "error");
        }

    };

    const columns: GridColDef[] = [
        { field: "question", headerName: "Question", minWidth: 250, flex: 1 },
        { field: "answer", headerName: "Answer", minWidth: 100, flex: 1 },
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
                    Welcome to the admin panel This is for faq
                </Typography>
                <Box ml={"auto"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        href="faq/create"
                    >
                        Add a FAQ
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
        props: { session },
    };
}
