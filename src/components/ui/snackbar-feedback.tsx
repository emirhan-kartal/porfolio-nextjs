import { Snackbar, Alert } from "@mui/material";
import { SnackbarContext } from "../context/snackbarContext";
import { useContext } from "react";

export default function SnackBarFeedback() {
    const { snackbarProps, setSnackbarProps } = useContext(SnackbarContext);
    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={snackbarProps.open}
            autoHideDuration={3000}
            onClose={() => setSnackbarProps({ ...snackbarProps, open: false })}
        >
            <Alert
                onClose={() =>
                    setSnackbarProps({ ...snackbarProps, open: false })
                }
                severity={snackbarProps.severity}
                sx={{ width: "100%" }}
            >
                {snackbarProps.message}
            </Alert>
        </Snackbar>
    );
}
