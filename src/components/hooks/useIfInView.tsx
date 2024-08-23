import { useEffect, useState, RefObject } from "react";

const useIfInView = (
    ref: RefObject<HTMLElement>,
    options?: IntersectionObserverInit
): boolean => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const refVal = ref.current;
        const observerOptions = { ...options, threshold: 0.2 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(ref.current as Element);
                    console.log("unobserved element", ref.current);
                }
            });
        }, observerOptions);

        observer.observe(ref.current);

        return () => {
            if (refVal) {
                observer.unobserve(refVal);
            }
        };
    }, [ref, options]);

    return isInView;
};

export default useIfInView;
