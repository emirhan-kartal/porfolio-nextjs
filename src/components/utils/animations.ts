import { duration } from "@mui/material";
import { delay, stagger } from "framer-motion";

export const containerVariants = {
    hidden: {
        opacity: 0,
        y: -50,
    },

    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.38,
            delayChildren: 0.8,
        },
        whileInView: {
            once: true,
        },
    },
};

export const container = (type?: string) => {
    if (type === "wo-delay") {
        return {
            ...containerVariants,
            visible: {
                ...containerVariants.visible,
                transition: {
                    ...containerVariants.visible.transition,
                    delayChildren: 0,
                },
            },
        };
    }
    return containerVariants;
};

export const itemVariants = {
    hidden: {
        opacity: 0,
        y: -100,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};
