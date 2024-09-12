import { FAQuestion } from "@/types";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";

export default function FAQAccordion({ question, answer }: any) {
    return (
        <>
            <Accordion
                sx={{
                    // Height when collapsed
                    minHeight: "5rem",
                }}
            >
                <AccordionSummary
                    aria-controls="frequently asked question"
                    sx={{ minHeight: "5rem" }}
                >
                    {question}
                </AccordionSummary>

                <AccordionDetails>
                    <Typography>{answer}</Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
}
