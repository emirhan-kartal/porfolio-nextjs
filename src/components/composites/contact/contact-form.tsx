import ContentWrapper from "@/components/ui/content-wrapper";
import EButton from "@/components/ui/ebutton";
import GradientIcon from "@/components/ui/gradient-icon";
import GradientText from "@/components/ui/gradient-text";
import { Typography, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";

export default function ContactForm() {
    const t = useTranslations("contact-form");
    const validationSchema = yup.object().shape({
        name: yup.string().required(t("name-required")),
        email: yup.string().email().required(t("email-required")),
        phone: yup.string().length(11, "").required(t("phone-required")),
        description: yup
            .string()
            .min(20, t("description-min")).max(1000, t("description-max"))
            .required(t("description-required")),
    });

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
        phone: "",
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
                    phone: "",
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
    return (
        <ContentWrapper content sx={{}}>
            <GradientText sx={{ fontSize: 40 }}>
                {t("get-in-touch")}
            </GradientText>
            <Typography py={1}>{t("have-in-mind")}</Typography>
            <Box display={"flex"} gap={2} mt={3} alignItems={"center"}>
                <GradientIcon icon="ic:outline-email" height={24} />
                <Typography variant="h6" fontSize={16}>
                    e.kartal115@gmail.com
                </Typography>
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
                    label={t("name")}
                    fullWidth
                    {...register("name")}
                    value={formData.name}
                    onChange={handleChange}
                    helperText={errors.name ? errors.name.message : ""}
                />

                <TextField
                    error={!!errors.email}
                    label={t("email")}
                    fullWidth
                    {...register("email")}
                    value={formData.email}
                    onChange={handleChange}
                    helperText={errors.email ? errors.email.message : ""}
                />
                <TextField
                    error={!!errors.phone}
                    label={t("phone")}
                    fullWidth
                    {...register("phone")}
                    value={formData.phone}
                    onChange={handleChange}
                    helperText={errors.phone ? errors.phone.message : ""}
                />
                <TextField
                    label={t("description")}
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
                    FormHelperTextProps={{ sx: { borderRadius: "1rem" } }}
                />

                <EButton
                    type="gradient"
                    submit
                    sx={{
                        width: { xs: "50%", sm: "40%", md: "20%" },
                        height: { xs: "6rem", sm: "5rem", md: "4rem" },
                    }}
                >
                    {isSubmitting ? t("submitting") : t("submit")}
                </EButton>
            </Box>
        </ContentWrapper>
    );
}
