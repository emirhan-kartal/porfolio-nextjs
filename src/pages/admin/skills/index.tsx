import { Icon } from "@iconify/react/dist/iconify.js";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../../api/auth/[...nextauth]";
import AdminLayout from "@/components/composites/admin/admin-layout";
import { getDatabase } from "@/lib/db";
import React, { useCallback, useEffect, useState } from "react";
import AddSkillModal from "@/components/ui/admin-add-skill-modal";
import useSWR from "swr";

export interface SkillRow {
    id: string;
    name: string;
    image: string;
}
export type SkillRowWithoutId = Omit<SkillRow, "id">;
const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch");
    }
    return response.json();
};
export default function Page() {
    const { data: session, status } = useSession();
    const { data, error, isLoading } = useSWR("/api/skills", fetcher);

    const [rows, setRows] = useState<SkillRow[]>(data);
    useEffect(() => {
        if (!data) return;
        setRows(data);
    }, [data]);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<SkillRow>({
        id: "",
        name: "",
        image: "",
    });

    const handleDelete = async (e: any, params: any) => {
        console.log(params.id);
        const result = await fetch("/api/skills?id=" + params.id, {
            method: "DELETE",
        });
        if (result.ok) {
            setRows((prev: any) => {
                return prev.filter((row: any) => row.id !== params.id);
            });
            alert("Success");
        } else {
            alert(result.statusText);
        }
        console.log(params);
    };
    const handleEdit = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        const rowObject: SkillRow = rows.find(
            (row: { id: string; name: string; image: string }) => row.id === id
        ) as SkillRow;
        setOpen(true);
        setSelectedRow(rowObject);
    };
    const handleClose = () => {
        setSelectedRow({ id: "", name: "", image: "" });
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
        [rows]
    );
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
    const query = await mongo.collection("skills").find({}).toArray();
    const skills = query.map((skill) => {
        return {
            _id: skill._id.toString(),
            name: skill.name,
            image: skill.image,
        };
    });
    console.log(skills);
    console.log("------------------------------");

    return {
        props: { skills, session },
    };
}
