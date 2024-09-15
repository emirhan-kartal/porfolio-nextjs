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

    const validate = (data: any) => {
        console.log(data);
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
            setFormData((prev: any) => ({
                ...prev,
                [lang]: { ...content[lang] },
                _id: content._id,
            }));
            setValidatedForms((prev: any) => ({ ...prev, [lang]: true }));
            reset({ [lang]: { ...content[lang] } });
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
        const localFormString = JSON.stringify({
            ...localFormData,
            [name.split(".")[1]]: value,
        });
        const contentString = JSON.stringify(content[lang]);

        if (localFormString === contentString) {
            setValidatedForms((prev: any) => ({ ...prev, [lang]: true }));
            return;
        }
        setValidatedForms((prev: any) => ({ ...prev, [lang]: false }));

    };

    const schema = getSchema(contentType, lang);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { [lang]: { ...localFormData } },
    });
    const errorObject = errors?.[lang] as any;
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
                            {...register(lang + "." + textField.name)}
                            defaultValue={
                                localFormData[textField.name as FormDataKey]
                            }
                            value={
                                localFormData[textField.name as FormDataKey] ??
                                ""
                            }
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
