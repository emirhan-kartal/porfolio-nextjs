import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../context/formContext";
import { SnackbarContext } from "../context/snackbarContext";
import { getSchema, getTextfields } from "../utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ContentType } from "@/types";
type AdminContentTextFieldsProps = {
    lang: "tr" | "en";
    isLoading?: boolean;
    contentType: ContentType;
};

export default function AdminContentTextFields({
    lang,
    isLoading,
    contentType,
}: AdminContentTextFieldsProps) {
    const { showSnackbar } = useContext(SnackbarContext);

    const { setValidatedForms, setFormData, content } = useContext(FormContext);
    //if content is not passed, that means it is creating a new content.If it is passed, it is editing an existing content.

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
    console.log("admin content text fields", contentType);
    const textFields = getTextfields(contentType);
    const nameList = textFields.map((textField) => textField.name);
    type FormDataKey = (typeof nameList)[number]; //gets the onion type of the keys
    type FormDataState = Record<FormDataKey, string>;

    const [localFormData, setLocalFormData] = useState<FormDataState>(
        {} as FormDataState
    );
    useEffect(() => {
        if (lang && content && content[lang]) {
            console.log(content[lang]);
            setLocalFormData(content[lang] as FormDataState);
        }
    }, [content]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFormData((prev: any) => ({
                ...prev,
                [lang]: { ...localFormData },
            }));
        }, 100);
        return () => clearTimeout(timer);
    }, [localFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setLocalFormData((prev) => ({
            ...prev,
            [name.split(".")[1]]: value,
        }));
        setValidatedForms((prev: any) => ({ ...prev, [lang]: false }));
    };

    const schema = getSchema(contentType, lang);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const errorObject = errors?.[lang] as any;
    console.log(errors);
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
                {textFields.map((textField: any) => {
                    return (
                        <TextField
                            key={textField.name}
                            label={textField.label}
                            value={
                                localFormData[textField.name as FormDataKey] ??
                                ""
                            }
                            {...register(lang + "." + textField.name)}
                            onChange={handleChange}
                            error={!!errorObject?.[textField.name]}
                            helperText={
                                errorObject?.[textField.name]
                                    ? errorObject[textField.name].message
                                    : ""
                            }
                            {...globals}
                            {...textField.props}
                        />
                    );
                })}
                <Button
                    variant="contained"
                    color="primary"
                    disabled={globals.disabled}
                    onClick={handleSubmit(validate)}
                >
                    Validate
                </Button>
            </Box>
        </>
    );
}
