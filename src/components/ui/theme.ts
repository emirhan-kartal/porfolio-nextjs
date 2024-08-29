import { createTheme } from "@mui/material";
import { Bai_Jamjuree } from "next/font/google";

export const jamjuree = Bai_Jamjuree({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const darkTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        background: "#1C1C22",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    background: "#1C1C22",
                    color: "lightgray",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#1C1C22",
                    backgroundImage: "none",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "#F0F2F5",
                    "&.Mui-focused": {
                        color: "#F0F2F5", // Focused label color
                    },
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    ".MuiFormHelperText-root": {
                        margin: 0,
                        padding: "0.2rem 0.5rem 0.2rem 0.5rem",
                        borderRadius: "0 0 0.25rem 0.25rem",
                    },
                },
            },
        },
    },
    typography: {
        fontFamily: "Jamjuree",
        allVariants: {
            color: "#F0F2F5",
        },
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#161513",
        },
        secondary: {
            main: "#1C1C22",
        },
        text: {
            primary: "#F0F2F5",
            secondary: "#ffffff",
        },
        background: {
            paper: "#161513",
            default: "#161513",
        },
    },
});
const lightTheme = createTheme({
    typography: {
        fontFamily: "Jamjuree",
        allVariants: {
            color: "#161513",
        },
    },
    palette: {
        mode: "light",
        primary: {
            main: "#F0F2F5",
        },
        secondary: {
            main: "#ffffff",
        },
        text: {
            primary: "#161513",
            secondary: "#161513",
        },
        background: {
            paper: "#F0F2F5",
            default: "#F0F2F5",
        },
    },
});
export { darkTheme, lightTheme };
