import { createContext } from "react";
interface FormContextProps {
    validatedForms: any;
    setValidatedForms: React.Dispatch<React.SetStateAction<any>>;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}
export const FormContext = createContext<FormContextProps>(
    {} as FormContextProps
);
