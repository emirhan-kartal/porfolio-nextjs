import { SkillRow, SkillRowWithoutId } from "@/pages/admin/skills";
import { Box, Button, Input, Modal, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface AddSkillModalProps {
    rows: SkillRow[];
    setRows: React.Dispatch<React.SetStateAction<SkillRow[]>>;
    open: boolean;
    selectedRow: SkillRow;
    closeCallback: () => void;
}
export default function AddSkillModal({
    rows,
    setRows,
    selectedRow,
    open,
    closeCallback,
}: AddSkillModalProps) {
    const [skill, setSkill] = useState<SkillRow>(selectedRow);
    useEffect(() => {
        setSkill(selectedRow);
    }, [selectedRow]);
    console.log(skill.id);
    const ref = useRef<HTMLInputElement>(null);
    const handleFileClick = () => {
        if (ref.current) {
            ref.current.click();
            console.log("clicked");
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSkill((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const handleSave = async (rowState: SkillRow) => {
        console.time("fetch");
        console.time("optimistic");
        setRows((prev: any) => {
            return prev.map((row: any) => {
                if (row.id === rowState.id) {
                    return rowState;
                }
                return row;
            });
        });
        closeCallback();
        console.timeEnd("optimistic");
        const result = await fetch("/api/skills", {
            method: "PUT",
            body: JSON.stringify(rowState),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.timeEnd("fetch");
        const rowsClone = [...rows];
        if (!result.ok) {
            setRows(rowsClone);
            alert("Edit failed");
        }
    };
    const handleAdd = async (skillObject: SkillRowWithoutId) => {
        console.log(skillObject);
        const result = await fetch("/api/skills", {
            method: "POST",
            body: JSON.stringify(skillObject),
        });

        if (result.ok) {
            setRows((prev: any) => {
                return [...prev, skillObject];
            });
        } else {
            alert(result.statusText);
        }
        closeCallback();
    };
    const handleFileChange = async () => {
        if (!ref.current?.files?.[0]) {
            return;
        }
        const formData = new FormData();
        formData.append("id", skill.id);
        formData.append("name", skill.name);
        formData.append("image", ref.current?.files?.[0] as Blob);

        const result = await fetch("/api/skills/photo", {
            method: skill.id === "" ? "POST" : "PUT",
            body: formData,
        });
        //optimistic approach
        const rowsClone = [...rows];

        const newFilePath = ref.current?.files?.[0].name;
    

        setSkill({ ...skill, image: newFilePath });
        setRows((prev: SkillRow[]) => {
            return prev.map((row: any) => {
                if (row.id === skill.id) {
                    return { ...row, image: "/skills/" + newFilePath };
                }
                return row;
            });
        });
        if (!result.ok) {
            setRows(rowsClone);
            setSkill(selectedRow);

            alert("Edit failed");
        }
        closeCallback();
        console.log(result);
    };

    return (
        <Modal open={open} onClose={closeCallback}>
            <Box
                display={"flex"}
                flexDirection={"column"}
                padding={4}
                gap={2}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: "50%",
                    boxShadow: 24,
                    bgcolor: "secondary.main",
                }}
            >
                <TextField
                    value={skill.name}
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />
                <input
                    type="file"
                    ref={ref}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <TextField value={skill.image} name="image" disabled />

                <Button onClick={handleFileClick} variant="contained">
                    {skill.image ? "Change Image" : "Add Image"}
                </Button>

                <Button onClick={closeCallback} variant="contained">
                    Cancel
                </Button>
                <Button
                    onClick={
                        skill.id === ""
                            ? () => handleAdd(skill)
                            : () => handleSave(skill)
                    }
                    variant="contained"
                >
                    {skill.id === "" ? "Add" : "Save"}
                </Button>
            </Box>
        </Modal>
    );
}
