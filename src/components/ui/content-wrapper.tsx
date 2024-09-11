import { Box } from "@mui/material";

export default function ContentWrapper({
    children,
    sx,
    content,
}: {
    children: React.ReactNode;
    sx?: object;
    content?: boolean;
}) {
    const paddingContent = (
        <Box width={{ xs: "90%", md: "85%" }}>{children}</Box>
    );
    const toReturn = content
        ? wrapperBox({ children: paddingContent, sx })
        : wrapperBox({ children, sx });

    return toReturn;
}

const wrapperBox = ({
    children,
    sx,
}: {
    children: React.ReactNode;
    sx?: object;
}) => {
    return (
        <Box
            bgcolor={"primary.main"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={sx}
            py={8}
            width={"100%"}
        >
            {children}
        </Box>
    );
};
export const contentWrapperSx = {
    bgcolor: "primary.main",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    pb: 8,
};
