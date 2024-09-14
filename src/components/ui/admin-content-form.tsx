import { useContext, useEffect, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";

import { useRouter } from "next/router";
import AdminContentLanguageTab from "./admin-content-language-tab";
import { Blog, ContentType, FAQuestionWithId, Project } from "@/types";
import { FormContext } from "../context/formContext";
import { SnackbarContext } from "../context/snackbarContext";
import { getTextfields } from "../utils/schemas";
type AdminContentFormProps = {
    content?: Blog | Project | FAQuestionWithId;
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
    const { showSnackbar } = useContext(SnackbarContext);
    const router = useRouter();
    const textFields = getTextfields(contentType);
    const initialLocaleContent = !content
        ? locales?.reduce((acc: any, locale: any) => {
              acc["author"] = "Emirhan Kartal";
              acc["_id"] = "";
              acc["date"] = new Date().toISOString();
              acc["thumbnail"] = "";
              acc[locale] = textFields.reduce((acc: any, textField: any) => {
                  acc[textField.name] = "";
                  return acc;
              }, {});
              return acc;
          }, {})
        : {};

    const [formData, setFormData] = useState<Blog | Project | FAQuestionWithId>(
        content ?? initialLocaleContent
    );

    const [validatedForms, setValidatedForms] = useState(
        locales?.reduce((acc: any, locale: any) => {
            acc[locale] = false;
            return acc;
        }, {})
    );

    const onSubmit = async (data: typeof formData) => {
        const apiRoute =
            `/api/${contentType}` + (content ? `/${formData._id}` : "");
        const { _id, ...formDataWOId } = data;
        showSnackbar("Success", "success");
        const result = await fetch(apiRoute, {
            method: content ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataWOId),
        });

        if (result.ok) {
            router.push("/admin/" + contentType);
        } else {
            showSnackbar("Failed", "error");
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
