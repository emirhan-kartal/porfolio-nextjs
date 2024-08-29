import { SkillRow, SkillRowWithoutId } from "@/pages/admin/skills";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
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
        console.log("useEffect triggered SeletectedRow", selectedRow);
    }, [selectedRow]);
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
    const [errors, setErrors] = useState({
        name: "",
        image: "",
    });

    const handleSave = async (rowState: SkillRow) => {
        console.time("fetch");
        console.time("optimistic");
        if (!checkFields()) {
            return;
        }
        const rowsClone = [...rows];

        setRows((prev: any) => {
            return prev.map((row: any) => {
                if (row._id === rowState._id) {
                    return rowState;
                }
                return row;
            });
        });
        console.timeEnd("optimistic");
        const result = await fetch("/api/skills", {
            method: "PUT",
            body: JSON.stringify(rowState),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.timeEnd("fetch");
        if (!result.ok) {
            setRows(rowsClone);
            alert("Edit failed");
        }
        closeCallback();
    };
    const checkFields = () => {
        let toReturn = true;
        if (skill.name === "") {
            setErrors((prev) => {
                return { ...prev, name: "Name is required" };
            });
            toReturn = false;
        }
        if (skill.image === "") {
            setErrors((prev) => {
                return { ...prev, image: "Image is required" };
            });
            toReturn = false;
        }
        return toReturn;
    };
    const handleAdd = async (skillObject: SkillRowWithoutId) => {
        console.log(skillObject);
        if (!checkFields()) {
            return;
        }

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
            console.log("No file selected");
            return;
        }
        const formData = new FormData();
        formData.append("_id", skill._id);
        formData.append("name", skill.name);
        formData.append("image", ref.current?.files?.[0] as Blob);
        const newFilePath = ref.current?.files?.[0].name;

        const rowsClone = [...rows];

        setSkill({ ...skill, image: "/skills/" + newFilePath });
        setRows((prev: SkillRow[]) => {
            console.log("STATE DEĞİŞTİRİLDİ(FONKSİYON ÇAĞIRILDI)");
            const newRows = prev.map((row: any) => {
                if (row._id === skill._id) {
                    return { ...row, image: "/skills/" + newFilePath };
                }
                return row;
            });
            console.log(newRows);
            return newRows;
        });
        const result = await fetch("/api/skills/photo", {
            method: skill._id === "" ? "POST" : "PUT",
            body: formData,
        });
        //optimistic approach
        console.log("rowsClone", rowsClone);

        if (!result.ok) {
            console.log("failed");

            alert("Edit failed");
        }
        if (skill.name !== "") {
            closeCallback();
            setErrors({ name: "", image: "" });
        }
        console.log(result);
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                setErrors({ name: "", image: "" });
                closeCallback();
            }}
        >
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
                    placeholder="Name"
                    error={!!errors.name}
                    helperText={errors.name ? errors.name : ""}
                    onChange={handleChange}
                    name="name"
                />
                <input
                    type="file"
                    ref={ref}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <TextField
                    value={skill.image}
                    disabled
                    helperText={errors.image ? errors.image : ""}
                    error={!!errors.image}
                    name="image"
                />

                <Button onClick={handleFileClick} variant="contained">
                    {skill.image ? "Change Image" : "Add Image"}
                </Button>

                <Button
                    onClick={() => {
                        setErrors({ name: "", image: "" });
                        closeCallback();
                    }}
                    variant="contained"
                >
                    Cancel
                </Button>
                <Button
                    onClick={
                        skill._id === ""
                            ? () => handleAdd(skill)
                            : () => handleSave(skill)
                    }
                    type="submit"
                    variant="contained"
                >
                    {skill._id === "" ? "Add" : "Save"}
                </Button>
            </Box>
        </Modal>
    );
}
