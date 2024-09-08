import { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import AdminContentLanguageTab from "./admin-content-language-tab";
import { Blog, Project } from "@/types";
import { FormContext } from "../context/formContext";

export default function AdminContentForm({
    content,
    type,
    isLoading,
}: {
    content?: Blog | Project;
    type: "blogs" | "projects";
    isLoading?: boolean;
}) {
    const { locales, locale } = useRouter();
    const [lang, setLang] = useState<"tr" | "en">(locale as "tr" | "en");
    const initialLocaleContent = locales?.reduce((acc: any, locale: any) => {
        acc[locale] = {
            title: content?.[lang]?.title || "",
            description: content?.[lang]?.description || "",
            tags: content?.[lang]?.tags || "",
            content: content?.[lang]?.content || "",
            thumbnail: content?.thumbnail || "",
        };
        return acc;
    }, {});
    const [formData, setFormData] = useState({
        _id: content?._id.toString() || "",
        date: new Date().toISOString(),
        thumbnail: content?.thumbnail || "",
        author: "Emirhan Kartal",
        ...initialLocaleContent,
    });
    const [validatedForms, setValidatedForms] = useState(
        locales?.reduce((acc: any, locale: any) => {
            acc[locale] = false;
            return acc;
        }, {})
    );
    const yupSchemaObject = locales?.reduce((acc: any, lang: any) => {
        acc[lang + ".title"] = yup.string().required("Title is required");
        acc[lang + ".description"] = yup
            .string()
            .required("Description is required");
        acc[lang + ".tags"] = yup.string().required("Tags are required");
        acc[lang + ".content"] = yup
            .string()
            .required("Content is required")
            .min(50, "Content must be at least 50 characters long.");

        return yup.object().shape(acc);
    }, {} as Record<string, yup.StringSchema>);

    const yupSchema = yup.object().shape(yupSchemaObject);

    const methods = useForm({
        resolver: yupResolver(yupSchema),
        defaultValues: formData,
    });

    useEffect(() => {
        if (content) {
            setFormData({
                title: content?.[lang].title,
                description: content?.[lang].description,
                tags: content?.[lang].tags,
                thumbnail: content.thumbnail,
                content: content?.[lang].content,
                author: "Emirhan Kartal",
                _id: content._id.toString(),
                date: content.date,
            });
        }
    }, [content]);

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
    const allValidated = Object.values(validatedForms).every(
        (value) => value === true
    );
    return (
        <FormContext.Provider
            value={{
                validatedForms,
                setValidatedForms,
                formData,
                setFormData,
            }}
        >
            <Box
                component="form"
                display="flex"
                flexDirection="column"
                gap={2}
                width="100%"
                height="100%"
                p={2}
                onSubmit={(e) => {
                    e.preventDefault();
                    if (allValidated) {
                        onSubmit(formData);

                        console.log(formData);
                    }
                }}
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

                <AdminContentLanguageTab
                    sendLangToParent={(data: "tr" | "en") => setLang(data)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading || !allValidated}
                >
                    {content ? "Update" : "Create"}
                </Button>
            </Box>
        </FormContext.Provider>
    );
}
