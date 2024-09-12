import ContentWrapper from "@/components/ui/content-wrapper";
import EButton from "@/components/ui/ebutton";
import FAQAccordion from "@/components/ui/faq-accordion";
import GradientText from "@/components/ui/gradient-text";
import { FAQuestionWithId } from "@/types";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
type FAQProps = {
    faqs: FAQuestionWithId[];
};
export default function FAQ({ faqs }: FAQProps) {
    const t = useTranslations("faq");
    const { locale } = useRouter();

    return (
        <ContentWrapper content sx={{ pt: 12 }}>
            <Box display={"flex"} flexDirection="column" gap={2} mb={2}>
                <Box>
                    <Typography variant="h2">{t("title-1")}</Typography>
                    <GradientText sx={{ fontSize: "4rem" }}>
                        {t("title-2")}
                    </GradientText>
                </Box>
                <Typography variant="h6">{t("description")}</Typography>
                <EButton
                    type="gradient"
                    sx={{
                        width: { xs: "50%", sm: "40%", md: "20%" },
                        height: { xs: "6rem", sm: "5rem", md: "4rem" },
                        mt: 3,
                        mb: 6,
                    }}
                >
                    {t("cta")}
                </EButton>
            </Box>
            {faqs?.map((faq) => (
                <FAQAccordion
                    key={faq._id}
                    question={faq[locale as "tr" | "en"].question}
                    answer={faq[locale as "tr" | "en"].answer}
                />
            ))}
            <FAQAccordion question="What is the meaning of life?" answer="42" />
        </ContentWrapper>
    );
}
