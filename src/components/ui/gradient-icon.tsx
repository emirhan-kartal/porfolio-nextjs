import { Box } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
export default function GradientIcon({
    icon,
    link,
}: {
    icon: string;
    link: string;
}) {
    return (
        <Link href={link} target="_blank" passHref legacyBehavior>
            <Box
                sx={{
                    background:
                        "linear-gradient(90deg, #B16CEA, #FF5E69, #FF8A56, #FFA84B)",
                    borderRadius: "40px",
                    position: "relative",
                    cursor: "pointer",
                }}
                height={40}
                width={40}
            >
                <Box
                    sx={{
                        bgcolor: "primary.main",
                        position: "absolute",
                        borderRadius: "37px",
                        top:"50%",
                        left:"50%",
                        transform: "translate(-50%, -50%)",
                    }}
                    width={37}
                    height={37}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Icon icon={icon} color={"#fff"} height={20} />
                </Box>
            </Box>
        </Link>
    );
}
