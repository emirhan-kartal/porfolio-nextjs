import React, { useContext } from "react";
import { Box, styled, Switch } from "@mui/material";
import { useRouter } from "next/router";
import { LoadingContext } from "../context/loadingContext";

const LanguageSwitcher = () => {
    const { locale, route, push, query } = useRouter();
    const { setLoading } = useContext(LoadingContext);
    const [switchLocale, setSwitchLocale] = React.useState(locale);
    const handleLanguageChange = () => {
        const newLocale = switchLocale === "tr" ? "en" : "tr";

        setSwitchLocale(newLocale);
        setLoading(true);

        const pushTimer = setTimeout(() => {
            push(
                {
                    pathname: route,
                    query: { ...query },
                },
                undefined,
                { locale: newLocale }
            );

            clearTimeout(pushTimer);
        }, 400);

        const timer = setTimeout(() => {
            setLoading(false);
            clearTimeout(timer);
        }, 750);

        // Change the language by redirecting to the same route with the selected locale
    };
    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        fontFamily: "inherit",
        "& .MuiSwitch-switchBase": {
            margin: 1,
            padding: 0,
            transform: "translateX(6px)",
            "&.Mui-checked": {
                color: "#fff",
                transform: "translateX(25px)",
                "& .MuiSwitch-thumb:before": {
                    display: "flex",
                    fontFamily: "inherit",
                    content: "'EN'",
                },
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor: "#aab4be",
                    ...theme.applyStyles("dark", {
                        backgroundColor: theme.palette.text.primary,
                    }),
                },
            },
        },
        "& .MuiSwitch-thumb": {
            width: 32,
            height: 32,
            "&::before": {
                content: "'TR'",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            },
            ...theme.applyStyles("dark", {
                backgroundColor: theme.palette.secondary.main,
            }),
        },
        "& .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: "#aab4be",
            borderRadius: 20 / 2,
            ...theme.applyStyles("dark", {
                backgroundColor: theme.palette.text.primary,
            }),
        },
    }));

    return (
        <Box
            display={"flex"}
            alignItems="center"
            justifyContent="center"
        >

            <MaterialUISwitch
                checked={switchLocale === "en"}
                onChange={handleLanguageChange}
            />
        </Box>
    );
};

export default LanguageSwitcher;
