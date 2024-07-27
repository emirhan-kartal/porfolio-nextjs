"use client";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ComponentType } from "react";

export default function SimpleFramer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            viewport={{once: true}}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
