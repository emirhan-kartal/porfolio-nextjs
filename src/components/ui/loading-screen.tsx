import { Box, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";

export default function LoadingScreen() {
    const { loading } = useContext(LoadingContext);
    return (
        <Box
            visibility={loading ? "visible" : "hidden"}
            display={"flex"}
            sx={{
                transition: "opacity 350ms, visibility 350ms",
                opacity: loading ? 1 : 0,

                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                backgroundColor: "secondary.main",
                height: "100vh",
                width: "100vw",
            }}
        >
            <CircularProgress sx={{ color: "text.primary" }} />
        </Box>
    );
}
