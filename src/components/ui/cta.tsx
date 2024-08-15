import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { itemVariants } from "../utils/animations";
import GradientText from "./gradient-text";

export default function CTA({mt}:{mt:number}) {
    return (
        <Box mt={mt} component={motion.div} variants={itemVariants}>
            <Typography fontSize={"29px"} mb={3}>
                See the impact of good development practices on your business.
            </Typography>
            <Link href={""}>
                <GradientText
                    sx={{
                        fontSize: { xs: 32, md: 72 },
                        WebkitTextDecorationLine: "underline",
                    }}
                    underline={true}
                >
                    Let&apos;s Work Together{" "}
                </GradientText>
            </Link>
        </Box>
    );
}
