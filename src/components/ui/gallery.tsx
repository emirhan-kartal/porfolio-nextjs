import { Box } from "@mui/material";
import GalleryImage from "./gallery-image";

export default function Gallery() {
    return (
        <Box height={{ xs: 200, md: 400 }} display={"flex"} width={"100%"} gap={1}>
            <GalleryImage
                src={"/me.png"}
                height={{ xs: 200, md: 400 }}
                width={"50%"}
            />
            <GalleryImage
                src={"/me.png"}
                height={{ xs: 200, md: 400 }}
                width={"100%"}
            />

            <Box display={"flex"} flexDirection={"column"} width={"50%"} gap={1}>
                <GalleryImage
                    src={"/me.png"}
                    height={{ xs: 100, md: 200 }}
                    width={"100%"}
                />
                <GalleryImage
                    src={"/me.png"}
                    height={{ xs: 100, md: 200 }}
                    width={"100%"}
                />
            </Box>
        </Box>
    );
}
