"use client";
// components/AnimatedComponent.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedComponentProps {
    children: React.ReactNode;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {

                delayChildren: 0.2,
            },
        },
    };

    const childVariants: Variants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 , transition: { duration: 1 } },
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 3 }}
        >
            {React.Children.map(children, (child, index) => (
                <motion.div key={index} variants={childVariants}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};

export default AnimatedComponent;
