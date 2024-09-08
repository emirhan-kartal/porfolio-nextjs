import { TextfieldType } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormContext } from "../context/formContext";
interface DynamicTextFieldsProps {
    textFieldsJson: TextfieldType[];
    globals: any;
    lang: "tr" | "en";
    yupSchema: any;
    validate: () => void;
}

export default function DynamicTextFields({
    textFieldsJson,
    globals,
    lang,
    yupSchema,
    validate,
}: DynamicTextFieldsProps) {
    const nameList = textFieldsJson.map((textField) => textField.name);
    type FormDataKey = (typeof nameList)[number]; //gets the onion type of the keys
    type FormDataState = Record<FormDataKey, string>;
    const [formData, setFormData] = useState<FormDataState>(
        {
            
        } as FormDataState
    );
    useEffect(() => {
        const timer = setTimeout(() => {
            setGlobalFormData((prev: any) => ({
                ...prev,
                [lang]: { ...formData },
            }));
        }, 100);
        return () => clearTimeout(timer);
    }, [formData]);
    const { setValidatedForms, setFormData: setGlobalFormData } =
        useContext(FormContext);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        console.log("İşte bu " + lang + "." + name);
        setFormData((prev) => ({
            ...prev,
            [name.split(".")[1]]: value,
        }));
        console.log(formData)
        setValidatedForms((prev: any) => ({ ...prev, [lang]: false }));
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(yupSchema),
    });
    const errorObject = errors?.[lang] as any;

    return (
        <>
            {textFieldsJson.map((textField: any) => {
                return (
                    <TextField
                        key={textField.name}
                        label={textField.label}
                        value={formData[textField.name as FormDataKey]}
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
        </>
    );
}
