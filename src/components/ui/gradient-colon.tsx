import { Box } from "@mui/material";

export default function GradientColon() {
    return (
        <Box
            width={"100%"}
            justifySelf={"start"}
        >
            <Box
                sx={{
                    width: "100%",
                    height: { xs: "50px", md: "120px" },
                    left: 0,
                    background:
                        "linear-gradient(90deg, #B16CEA, #FF5E69, #FF8A56, #FFA84B)",
                }}
            />
        </Box>
    );
}
