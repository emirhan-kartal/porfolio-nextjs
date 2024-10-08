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
            staggerChildren: 0.5,
            delayChildren: 0.8,
        },

    },
};

export const container = (type?: string,delay?:number) => {
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
    } else if (type === "w-delay") {
        return {
            ...containerVariants,
            visible: {
                ...containerVariants.visible,
                transition: {
                    ...containerVariants.visible.transition,
                    delayChildren: delay ?? 0.8,
                },
            },
        };
    }
    return containerVariants;
};
export const itemWithDelay = (delayTime: number) => {
    return {
        ...itemVariants,
        visible: {
            ...itemVariants.visible,
            transition: {
                ...itemVariants.visible.transition,
                delay: delayTime,
            },
        },
    };
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
