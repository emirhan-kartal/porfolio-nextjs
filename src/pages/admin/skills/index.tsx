import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import AdminLayout from "@/components/composites/admin/admin-layout";
import React, { useCallback, useEffect, useState } from "react";
import AddSkillModal from "@/components/ui/admin-add-skill-modal";
import useSWR from "swr";
import { fetcher } from "@/components/utils/fetcher";
import { SkillRow } from "@/types";

export default function Page() {
    const { data, error, isLoading } = useSWR("/api/skills", fetcher);

    const [rows, setRows] = useState<SkillRow[]>([]);

    useEffect(() => {
        if (!data || rows.length !== 0) return;
        console.log("data useEffect Triggered", data);
        setRows([...data]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<SkillRow>({
        _id: "",
        name: "",
        image: "",
    });

    const handleDelete = async (e: any, params: any) => {
        console.log(params.id);
        const rowsClone = [...rows];
        setRows((prev: any) => {
            return prev.filter((row: SkillRow) => row._id !== params.id);
        });
        const result = await fetch("/api/skills?id=" + params.id, {
            method: "DELETE",
        });

        if (!result.ok) {
            setRows(rowsClone);
            alert(result.statusText);
        }
        console.log(params);
    };
    const handleEdit = (e: React.MouseEvent, _id: string) => {
        e.stopPropagation();
        console.log("handleEdit id", _id);
        const rowObject: SkillRow = rows.find(
            (row: SkillRow) => row._id === _id
        ) as SkillRow;
        console.log("handleEdit rOWS", rows);
        setOpen(true);
        setSelectedRow(rowObject);
    };
    const handleClose = () => {
        setSelectedRow({ _id: "", name: "", image: "" });
        setOpen(false);
    };

    const getActions = useCallback(
        (params: any) => [
            <IconButton
                key={params.id}
                aria-label="edit"
                size="small"
                onClick={(e) => handleEdit(e, params.id as string)}
            >
                <Icon icon="akar-icons:edit" />
            </IconButton>,
            <IconButton
                key={params.row}
                aria-label="delete"
                size="small"
                onClick={(e) => handleDelete(e, params)}
            >
                <Icon icon="material-symbols:delete-outline" />
            </IconButton>,
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [rows]
    );
    if (error) {
        return <div>Error</div>;
    }
    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", minWidth: 100, flex: 1 },
        { field: "image", headerName: "Image", minWidth: 250, flex: 1 },

        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            minWidth: 100,
            flex: 1,
            getActions: getActions,
        },
    ];

    return (
        <AdminLayout>
            <AddSkillModal
                rows={rows}
                setRows={setRows}
                open={open}
                selectedRow={selectedRow}
                closeCallback={handleClose}
            />
            <Box display={"flex"}>
                <Typography>Welcome to the admin panel.Add a skill</Typography>
                <Box ml={"auto"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpen(true)}
                    >
                        Add a skill
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
