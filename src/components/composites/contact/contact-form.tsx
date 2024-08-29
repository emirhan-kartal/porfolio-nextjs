import ContentWrapper from "@/components/ui/content-wrapper";
import EButton from "@/components/ui/ebutton";
import GradientIcon from "@/components/ui/gradient-icon";
import GradientText from "@/components/ui/gradient-text";
import { Typography, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    budget: yup.string().required("Budget is required"),
    description: yup
        .string()
        .min(20, "Description must be at least 20 characters long.")
        .required("Description is required"),
});

export default function ContactForm() {
    const resolver = yupResolver(validationSchema);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        budget: "",
        description: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    };
    useEffect(() => {
        console.log(errors);
    }, [errors]);
    const onSubmit = async () => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Your message has been sent!");
                setFormData({
                    name: "",
                    email: "",
                    budget: "",
                    description: "",
                });
            } else {
                alert("Something went wrong. Please try again later.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };
    console.log(errors);
    return (
        <ContentWrapper content sx={{}}>
            <GradientText sx={{ fontSize: 40 }}>Get In Touch</GradientText>
            <Typography py={1}>
                Have a project in mind? Looking for a collaborator? Reach out to
                me using the form below. I will get back to you under 48 hours.
            </Typography>
            <Box display={"flex"} gap={3} mt={3} alignItems={"center"}>
                <GradientIcon icon="ic:outline-email" height={24} />
                <Typography variant="h6">e.kartal115@gmail.com</Typography>
            </Box>

            <Box
                component="form"
                sx={{ mt: 6 }}
                display={"flex"}
                flexDirection={"column"}
                gap={6}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    error={!!errors.name}
                    label="Name"
                    fullWidth
                    {...register("name")}
                    value={formData.name}
                    onChange={handleChange}
                    helperText={errors.name ? errors.name.message : ""}
                />

                <TextField
                    error={!!errors.email}
                    label="Email"
                    fullWidth
                    {...register("email")}
                    value={formData.email}
                    onChange={handleChange}
                    helperText={errors.email ? errors.email.message : ""}
                />
                <TextField
                    error={!!errors.budget}
                    label="Budget"
                    fullWidth
                    {...register("budget")}
                    value={formData.budget}
                    onChange={handleChange}
                    helperText={errors.budget ? errors.budget.message : ""}
                />
                <TextField
                    label="Your Project's Description"
                    multiline
                    rows={8}
                    fullWidth
                    value={formData.description}
                    {...register("description")}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={
                        errors.description ? errors.description.message : ""
                    }
                    FormHelperTextProps={{ sx: { borderRadius:"1rem"} }}
                />

                <EButton
                    type="gradient"
                    submit
                    sx={{
                        width: { xs: "50%", sm: "40%", md: "20%" },
                        height: { xs: "6rem", sm: "5rem", md: "4rem" },
                    }}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </EButton>
            </Box>
        </ContentWrapper>
    );
}
