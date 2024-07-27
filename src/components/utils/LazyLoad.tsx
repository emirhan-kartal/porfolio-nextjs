import { useInView } from "framer-motion";
import React, { useEffect } from "react";
import useIfInView from "../hooks/useIfInView";
import { Box } from "@mui/material";

export default function LazyLoad({ children }: { children: React.ReactNode }) {
    const onlyChild = React.Children.only(children);
    const ref = React.useRef<HTMLDivElement>(null);
    const inView = useIfInView(ref);
    return (
        <div ref={ref}>
            {inView ? (
                onlyChild
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    bgcolor={"primary.main"}
                >
                    <h1>Loading...</h1>
                </Box>
            )}
        </div>
    );
}
