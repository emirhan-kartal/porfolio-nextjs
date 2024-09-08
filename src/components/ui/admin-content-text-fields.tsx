import { Box } from "@mui/material";
import { useContext } from "react";
import * as yup from "yup";
import { FormContext } from "../context/formContext";
import { SnackbarContext } from "../context/snackbarContext";
import { TextfieldType } from "@/types";
import DynamicTextFields from "../hooks/dynamic-text-fields";
type AdminContentTextFieldsProps = {
    lang: "tr" | "en";
    isLoading?: boolean;
    sendDataToParent: (data: any) => void;
};

export default function AdminContentTextFields({
    lang,
    isLoading,
}: AdminContentTextFieldsProps) {
    const { showSnackbar } = useContext(SnackbarContext);

    const { setValidatedForms } = useContext(FormContext);

    const schema = yup.object().shape({
        [lang]: yup.object().shape({
            title: yup.string().required("Title is required"),
            description: yup.string().required("Description is required"),
            tags: yup.string().required("Tags are required"),
            content: yup
                .string()
                .required("Content is required")
                .min(50, "Content must be at least 50 characters long."),
            thumbnail: yup.string().required("Thumbnail is required"),
        }),
    });

    const validate = () => {
        console.log("validated");
        setValidatedForms((prev: any) => ({ ...prev, [lang]: true }));
        showSnackbar("Form is validated", "success");
    };

    const globals = {
        fullWidth: true,
        required: true,

        disabled: isLoading,
        variant: "outlined",
    };
    const textFields = [
        {
            name: "title",
            label: "Title",
        },
        {
            name: "description",
            label: "Description",
        },
        {
            name: "tags",
            label: "Tags",
        },
        {
            name: "thumbnail",
            label: "Thumbnail",
        },
        {
            name: "content",
            label: "Content",
            props: {
                multiline: true,
                rows: 20,
            },
        },
    ] as TextfieldType[];
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                width="100%"
                height="100%"
                p={2}
                sx={{ opacity: isLoading ? 0.5 : 1 }}
            >
                <DynamicTextFields
                    textFieldsJson={textFields}
                    globals={globals}
                    lang={lang}
                    yupSchema={schema}
                    validate={validate}
                />
            </Box>
        </>
    );
}
