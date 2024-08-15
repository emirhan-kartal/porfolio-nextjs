import ContentWrapper from "@/components/ui/content-wrapper";
import EButton from "@/components/ui/ebutton";
import GradientIcon from "@/components/ui/gradient-icon";
import GradientText from "@/components/ui/gradient-text";
import { Typography, Box, TextField } from "@mui/material";

export default function ContactForm() {
    return (
        <ContentWrapper content sx={{ py:0 }}>
            <GradientText sx={{ fontSize: 40 }}>Get In Touch</GradientText>
            <Typography>
                Have a project in mind? Looking for a collaborator? Reach out to
                me using the form below. I will get back to you under 48 hours.
            </Typography>
            <Box display={"flex"} gap={3} mt={3} alignItems={"center"}>
                <GradientIcon icon="email" link="" />
                <Typography variant="h6">Email</Typography>
            </Box>
            <Box display={"flex"} gap={3} mt={3} alignItems={"center"}>
                <GradientIcon icon="email" link="" />
                <Typography variant="h6">Email</Typography>
            </Box>

            <Box
                component="form"
                sx={{ mt: 6 }}
                display={"flex"}
                flexDirection={"column"}
                gap={8}
            >
                <TextField
                    label="Name"
                    fullWidth
                    sx={{

                    }}  
                />
                <TextField label="Email" fullWidth />
                <TextField label="Budget" fullWidth />
                <TextField
                    label="Your Project's Description"
                    multiline
                    rows={8}
                    fullWidth
                />
                <EButton type="gradient"  sx={{width:{xs:"50%",sm:"40%",md:"20%"},height:{xs:"6rem",sm:"5rem",md:"4rem"}}}>
                    Submit Now
                </EButton>
            </Box>
        </ContentWrapper>
    );

}