import { useEffect, useState } from "react";
import { Blog } from "@/pages/blog";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { Project } from "../composites/featured-projects";

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const apiRoute = `/api/${type}`;
        console.log(apiRoute);
        const {_id,...formDataWOId} = formData;
        const result = await fetch(apiRoute, {
            method: content ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(content ? formData : formDataWOId),
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
            onSubmit={handleSubmit}
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
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={isLoading}
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
            />
            <TextField
                label="Tags"
                variant="outlined"
                fullWidth
                required
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                disabled={isLoading}
            />
            <TextField
                label="Thumbnail"
                variant="outlined"
                fullWidth
                required
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                disabled={isLoading}
            />
            <TextField
                label="Content"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={30}
                name="content"
                value={formData.content}
                onChange={handleChange}
                disabled={isLoading}
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
