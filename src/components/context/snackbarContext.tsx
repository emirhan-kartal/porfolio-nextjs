import { createContext, useState } from "react";
interface SnackbarProps {
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
}
type ShowSnackbar = Omit<SnackbarProps, "open">;
interface SnackbarContextProps {
    showSnackbar: (message: any, severity: any) => void;
    setSnackbarProps: React.Dispatch<React.SetStateAction<SnackbarProps>>;
    snackbarProps: SnackbarProps;
}
export const SnackbarContext = createContext({} as SnackbarContextProps);
export default function SnackbarProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
        open: false,
        message: "",
        severity: "success",
    });
    const showSnackbar = (message: any, severity: any) => {
        setSnackbarProps({ message, severity, open: true });
        console.log(message, severity, "123123");
    };

    return (
        <SnackbarContext.Provider
            value={{ showSnackbar, setSnackbarProps, snackbarProps }}
        >
            {children}
        </SnackbarContext.Provider>
    );
}
