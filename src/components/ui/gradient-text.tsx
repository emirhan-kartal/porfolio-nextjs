import { Box, Typography } from "@mui/material";

export default function GradientText({
    children,
    sx,
    underline = false,

    ...props
}: {
    children: React.ReactNode;
    underline?: boolean;
    sx?: object;
}) {
    return (
        <Box
            sx={{
                display: "inline-block",
                position: "relative",
                ...sx,
            }}
        >
            <Typography
                sx={{
                    background:
                        "linear-gradient(90deg, #B16CEA, #FF5E69, #FF8A56, #FFA84B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "1.5rem",
                    textDecoration: "underline",
                    width: "100%", // i dunno why but it doesnt shop up with full width
                    ...sx,
                }}
                {...props}
            >
                {children}
            </Typography>
            {underline && (
                <Box
                    component="span"
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",

                        background:
                            "linear-gradient(90deg, #B16CEA, #FF5E69, #FF8A56, #FFA84B)",
                    }}
                />
            )}
        </Box>
    );
}
