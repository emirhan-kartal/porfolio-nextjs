import { useState, useEffect, useRef } from "react";

export default function useResponsiveImage(condition: (x: number) => number) {
    const [imageResolution, setImageResolution] = useState(150);
    const ref = useRef<HTMLDivElement>(null); //container
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const newResolution = condition(width);
            setImageResolution(newResolution-20);
        };

        handleResize(); // Set initial value

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { imageResolution, ref };
}
