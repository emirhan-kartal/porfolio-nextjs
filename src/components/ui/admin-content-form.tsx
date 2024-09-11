import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";

import { useRouter } from "next/router";
import AdminContentLanguageTab from "./admin-content-language-tab";
import {
    Blog,
    BlogData,
    ContentType,
    Project,
    ProjectData,
} from "@/types";
import { FormContext } from "../context/formContext";
type AdminContentFormProps = {
    content?: Blog | Project;
    contentType: ContentType;
    isLoading?: boolean;
};

export default function AdminContentForm({
    content,
    contentType,
    isLoading,
}: AdminContentFormProps) {
    const { locales, locale } = useRouter();
    const [lang, setLang] = useState<"tr" | "en">(locale as "tr" | "en");
    console.log(contentType," testx1 ")
    const initialLocaleContent = locales?.reduce((acc: any, locale: any) => {
        const jsonContent = {
            title: content?.[lang]?.title || "",
            description: content?.[lang]?.description || "",
            tags: content?.[lang]?.tags || "",
            content: content?.[lang]?.content || "",
            thumbnail: content?.thumbnail || "",
        } as BlogData | ProjectData;
        if (contentType === "project") {
            (jsonContent as ProjectData)["github"] =
                (content as Project)?.[locale as "tr" | "en"]?.github || "";
        }
        acc[locale] = {
            ...jsonContent,
        };
        return acc;
    }, {});
    const [formData, setFormData] = useState<Blog | Project>({
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

    const onSubmit = async (data: typeof formData) => {
        const apiRoute =
            `/api/${contentType}` + (content ? `?id=${formData._id}` : "");
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
    console.log("admin content form", contentType);
    return (
        <FormContext.Provider
            value={{
                validatedForms,
                setValidatedForms,
                formData,
                setFormData,
                content,
                isLoading,
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
                    contentType={contentType}
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
