import { createContext, useState } from "react";

type LoadingContextType = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContextType>(
    {} as LoadingContextType
);
export default function LoadingProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(false);
    return (
        <LoadingContext.Provider
            value={{
                loading,
                setLoading,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
}
