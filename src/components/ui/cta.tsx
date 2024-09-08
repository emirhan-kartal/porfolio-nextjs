import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { itemVariants } from "../utils/animations";
import GradientText from "./gradient-text";
import { useTranslations } from "next-intl";

export default function CTA({ mt }: { mt: number }) {
    const t = useTranslations("CTA");
    return (
        <Box mt={mt} component={motion.div} variants={itemVariants}>
            <Typography fontSize={"29px"} mb={3}>
                {t("text")}
            </Typography>
            <Link href={"/contact"}>
                <GradientText
                    sx={{
                        fontSize: { xs: 32, md: 72 },
                        WebkitTextDecorationLine: "underline",
                    }}
                    underline={true}
                >
                    {t("button")}
                </GradientText>
            </Link>
        </Box>
    );
}
