import { Button, Typography } from "@mui/material";
import Link from "next/link";

interface ButtonProps {
    type: "gradient" | "white" | "black";
    children: React.ReactNode;
    width?: string;
    height?: string;
    href?: string;
    sx?: object;
}
export default function EButton({
    type,
    children,
    width,
    height,
    sx,
    href,
}: ButtonProps) {
    const toReturn = (
        <>
            <Button
                sx={{
                    background:
                        type === "gradient"
                            ? "linear-gradient(90deg, #B16CEA, #FF5E69, #FF8A56, #FFA84B)"
                            : type === "white"
                            ? "white"
                            : "black",
                    color: type === "gradient" ? "white" : "black",
                    borderRadius: "50px",
                    border: type === "gradient" ? "none" : "1px solid black",
                    padding: "10px 20px",
                    cursor: "pointer",
                    width: width ? width : "fit-content",
                    height: height ? height : "fit-content",
                    "&:hover > :first-child": {
                        color: "white",
                    },
                    ...sx,
                }}
            >
                <Typography
                    color={
                        type === "black"
                            ? "white"
                            : type === "white"
                            ? "black"
                            : ""
                    }
                >
                    {children}
                </Typography>
            </Button>
        </>
    );

    return href ? (
        <Link href={href} passHref>
            {toReturn}
        </Link>
    ) : (
        toReturn
    );
}
