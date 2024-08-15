import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";

export interface FAQuestion {
    question: string;
    answer: string;
}

export default function FAQAccordion({ question, answer }: FAQuestion) {
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
