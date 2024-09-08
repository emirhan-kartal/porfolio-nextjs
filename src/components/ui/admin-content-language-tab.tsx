import { Tabs, Tab, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import TabPanel from "./tab-panel";
import AdminContentTextFields from "./admin-content-text-fields";
import { FormContext } from "../context/formContext";

interface AdminContentLanguageTabProps {
    sendLangToParent: (data: "tr" | "en") => void;
}
export default function AdminContentLanguageTab({
    sendLangToParent,
}: AdminContentLanguageTabProps) {
    const { locales } = useRouter();
    const [value, setValue] = useState<number>(0); //
    const handleChange = (newValue: number) => {
        setValue(newValue);
        const lang = locales![newValue] as "tr" | "en";
        sendLangToParent(lang);
    };
    const {validatedForms} = useContext(FormContext);
    return (
        <>
            <Tabs
                value={value}
                textColor={"secondary"}
                indicatorColor="secondary"
                onChange={(_, newValue) => handleChange(newValue)}
                
            >
                {locales?.map((locale,i) => (
                    <Tab
                        value={i}
                        key={i}
                        label={locale.toUpperCase()}
                    />
                ))}
            </Tabs>
            {locales?.map((locale, index) => (
                <TabPanel value={locales[value]} index={locales[index]} key={locale}>
                    <Typography variant="h6" gutterBottom>
                        {locale.toUpperCase()}
                        {
                            validatedForms[locale] && " - Form is validated"
                        }
                    </Typography>
                    <AdminContentTextFields
                        lang={locale as "tr" | "en"}
                        sendDataToParent={() => {}}
                    />
                </TabPanel>
            ))}
        </>
    );
}
