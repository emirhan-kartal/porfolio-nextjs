import { SkillRow, SkillRowWithoutId } from "@/pages/admin/skills";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useFileUpload from "../hooks/useFileUpload";
import useSkillForm from "../hooks/useSkillForm";
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
    useEffect(() => {
        setSkill(selectedRow);
        console.log("useEffect triggered SeletectedRow", selectedRow);
    }, [selectedRow]);
    const [skill, setSkill] = useState<SkillRow>(selectedRow);
    const [errors, setErrors] = useState({ name: "", image: "" });

    const { ref, handleFileClick, handleFileChange, submitFile } =
        useFileUpload(skill, rows, closeCallback, setErrors, setSkill, setRows);

    const { handleChange, handleSave, handleAdd } = useSkillForm({
        skill,
        rows,
        setRows,
        closeCallback,
        submitFile,
        setSkill,
        setErrors,
    });
    return (
        <Modal
            open={open}
            onClose={() => {
                setErrors({ name: "", image: "" });
                if (ref.current?.files?.[0]) {
                    ref.current.value = "";
                }
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
