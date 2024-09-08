export default function TabPanel({
    children,
    value,
    index,
}: {
    children: React.ReactNode;
    value: string;
    index: string;
}) {
    return (
        <div
            style={{
                visibility: value === index ? "visible" : "hidden",
                position: value === index ? "static" : "absolute",
            }}
        >
            {children}
        </div>
    );
}
