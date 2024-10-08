import React from "react";
import { Box } from "@mui/material";
import useIfInView from "../hooks/useIfInView";

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
                        height: "100dvh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    bgcolor={"background.paper"}
                />
            )}
        </div>
    );
}
