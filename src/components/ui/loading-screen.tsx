import { Box, CircularProgress } from "@mui/material";
import { useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";
import React from "react";

export default function LoadingScreen() {
    const { loading } = useContext(LoadingContext);
    const ref = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (loading === false && ref.current) {
            const timer = setTimeout(() => {
                ref.current?.classList.add("hidden");
            }, 350);
            return () => clearTimeout(timer);
        }
        if (loading && ref.current) {
            ref.current?.classList.remove("hidden");
        }
    }, [loading]);

    return (
        <Box
            ref={ref}
            component={"div"}
            visibility={!loading ? "hidden" : "visible"}
        
            display={"flex"}
            sx={{
                transition: "opacity 350ms, visibility 350ms",
                opacity: !loading ? 0 : 1,

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
