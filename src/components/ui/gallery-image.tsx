import { Box, Grid } from "@mui/material";
import Image from "next/image";

interface GalleryImageProps {
    src: string;
    height: any;
    width?: any;
}

export default function GalleryImage({
    src,
    height,
    width,
}: GalleryImageProps) {
    return (
        <Box
            height={height}
            display={"flex"}
            width={width}
            bgcolor={"text.primary"}
        >
            <Image
                src={src}
                alt={"Emirhan Kartal"}
                width={0}
                height={0}
                sizes="100wv"
                style={{ height: "auto", width: "100%", objectFit: "cover" }}
            />
        </Box>
    );
}
