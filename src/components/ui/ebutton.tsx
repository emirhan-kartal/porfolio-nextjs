import { Button, Typography } from "@mui/material";
import Link from "next/link";

interface ButtonProps {
    type: "gradient" | "white" | "black";
    children: React.ReactNode;
    width?: string;
    height?: string;
    href?: string;
    sx?: object;
    submit?: boolean;
}
export default function EButton({
    type,
    children,
    width,
    height,
    sx,
    href,
    submit,
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
                    width: width ? width : "180px",
                    height: height ? height : "fit-content",
                    "&:hover > :first-of-type": {
                        color: "white",
                    },
                    ...sx,
                }}
                type={submit ? "submit" : "button"}
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
