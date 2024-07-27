import ContentWrapper from "@/components/ui/content-wrapper";
import EButton from "@/components/ui/ebutton";
import FAQAccordion from "@/components/ui/faq-accordion";
import GradientText from "@/components/ui/gradient-text";
import { Box, Typography } from "@mui/material";

export default function FAQ() {
    return (
        <ContentWrapper content sx={{pt:12}}>
            <Box display={"flex"} flexDirection="column" gap={2} mb={2}>
                <Box>
                    <Typography variant="h2">
                        Frequently Asked 
                    </Typography>
                    <GradientText sx={{fontSize:"4rem"}}>Questions</GradientText>
                </Box>
                <Typography variant="h6">
                    Answer to the Ultimate Question of Life, the Universe, and
                    Everything
                </Typography>
                <EButton
                    type="gradient"
                    sx={{
                        width: { xs: "50%", sm: "40%", md: "20%" },
                        height: { xs: "6rem", sm: "5rem", md: "4rem" },
                        mt:3,
                        mb:6
                    }}
                >
                    Contact Me
                </EButton>
            </Box>
            <FAQAccordion question="What is the meaning of life?" answer="42" />
            <FAQAccordion question="What is the meaning of life?" answer="42" />
        </ContentWrapper>
    );
}
