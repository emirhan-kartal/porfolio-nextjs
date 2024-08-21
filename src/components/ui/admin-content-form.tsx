import { useState } from "react";
import { Blog } from "@/pages/blog";
import { Box, TextField, Button } from "@mui/material";
import { Project } from "../composites/featured-projects";

export default function AdminContentForm({
    content,
    type,
}: {
    content?: Blog | Project;
    type: "blogs" | "projects";
}) {
    const [formData, setFormData] = useState({
        title: content?.title || "",
        description: content?.description || "",
        tags: content?.tags || "",
        thumbnail: content?.thumbnail || "",
        content: content?.content || "",
        author: "Emirhan Kartal",
        id: content?._id.toString() || "",
        date: new Date().toISOString(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name,"name")
        console.log(value,"value")
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const apiRoute = `/api/${type}`;
        console.log(apiRoute);
        const result = await fetch(apiRoute, {
            method: content ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (result.ok) {
            alert("Success");
        } else {
            alert(result.statusText);
        }
    };
    console.log(content)

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
        >
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
            />
            <TextField
                label="Tags"
                variant="outlined"
                fullWidth
                required
                name="tags"
                value={formData.tags}
                onChange={handleChange}
            />
            <TextField
                label="Thumbnail"
                variant="outlined"
                fullWidth
                required
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
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
            />
            <Button variant="contained" color="primary" type="submit">
                {content ? "Update" : "Create"}
            </Button>
        </Box>
    );
}
