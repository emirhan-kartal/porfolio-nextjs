import { Box, Typography, useTheme } from "@mui/material";

export default function GradientText({
    children,
    sx,
    underline = false,

    ...props
}: {
    children: React.ReactNode;
    underline?: boolean;
    sx?: { [key: string]: any };
}) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "inline-block",
                position: "relative",
                ...sx,
            }}
        >
            {/*             <div
                className="gradient-text"
                style={{
                    color: theme.palette.text.primary,
                    fontSize: sx?.fontSize ? sx.fontSize : "1.5rem",
                    ...sx,
                }}
            >
                {children}
            </div> */}
            <Typography
                className="gradient-text"
                component={"div"}
                sx={{
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
