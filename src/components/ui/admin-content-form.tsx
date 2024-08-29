import { useEffect, useState } from "react";
import { Blog } from "@/pages/blog";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { Project } from "../composites/featured-projects";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export default function AdminContentForm({
    content,
    type,
    isLoading,
}: {
    content?: Blog | Project;
    type: "blogs" | "projects";
    isLoading?: boolean;
}) {
    const [formData, setFormData] = useState({
        title: content?.title || "",
        description: content?.description || "",
        tags: content?.tags || "",
        thumbnail: content?.thumbnail || "",
        content: content?.content || "",
        author: "Emirhan Kartal",
        _id: content?._id.toString() || "",
        date: new Date().toISOString(),
    });

    const yupSchema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        tags: yup.string().required("Tags are required"),
        thumbnail: yup.string().url("Must be an URL").required(),
        content: yup.string().required("Content is required"),
        author: yup.string().required(),
        _id: yup.string().required(),
        date: yup.string().required(),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(yupSchema),
        defaultValues: formData,
    });

    useEffect(() => {
        if (content) {
            setFormData({
                title: content.title,
                description: content.description,
                tags: content.tags,
                thumbnail: content.thumbnail,
                content: content.content,
                author: "Emirhan Kartal",
                _id: content._id.toString(),
                date: content.date,
            });
        }
    }, [content]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, "name");
        console.log(value, "value");
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = async (data: typeof formData) => {
        const apiRoute =
            `/api/${type}` + (content ? `?id=${formData._id}` : "");
        const { _id, ...formDataWOId } = data;
        const result = await fetch(apiRoute, {
            method: content ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataWOId),
        });
        if (result.ok) {
            alert("Success");
        } else {
            alert(result.statusText);
        }
    };

    console.log(content);

    return (
        <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            width="100%"
            height="100%"
            p={2}
            onSubmit={handleSubmit(onSubmit)}
            sx={{ opacity: isLoading ? 0.5 : 1 }}
        >
            <CircularProgress
                sx={{
                    visibility: isLoading ? "visible" : "hidden",
                    color: "white",
                    position: "absolute",
                    zIndex: 1000,
                    top: "50vh",
                    left: "50vw",
                    transform: "translate(-50%, -50%)",
                }}
            />
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                required
                value={formData.title}
                {...register("title")}
                disabled={isLoading}
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                required
                value={formData.description}
                disabled={isLoading}
                {...register("description")}
            />
            <TextField
                label="Tags"
                variant="outlined"
                fullWidth
                required
                value={formData.tags}
                disabled={isLoading}
                {...register("tags")}
            />
            <TextField
                label="Thumbnail"
                variant="outlined"
                fullWidth
                required
                value={formData.thumbnail}
                disabled={isLoading}
                {...register("thumbnail")}
            />
            <TextField
                label="Content"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={30}
                value={formData.content}
                disabled={isLoading}
                {...register("content")}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
            >
                {content ? "Update" : "Create"}
            </Button>
        </Box>
    );
}
