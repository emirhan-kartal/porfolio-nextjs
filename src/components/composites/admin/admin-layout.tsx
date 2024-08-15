import { Box } from "@mui/material";
import { useRouter } from "next/router";
import AdminHeader from "../../ui/admin-header";
import AdminNav from "@/components/ui/admin-nav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    return (
        <>
            <Box
                position={"absolute"}
                zIndex={1}
                top={0}
                bgcolor={"primary.main"}
                width={"100%"}
            >
                <AdminHeader />
                <Box display={"flex"} height={"calc(100% - 50px)"}>
                    <Box
                        width={"200px"}
                        minHeight={"100%"}
                        bgcolor={"secondary.main"}
                    >
                        <AdminNav />
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                        p={2}
                        width={"100%"}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </>
    );
}
