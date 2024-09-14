import { Blog, ContentType, FAQuestion, Project, TextfieldType } from "@/types";
import * as yup from "yup";

const getSchema = (type: ContentType, lang: string) => {
    const baseJson = {
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        tags: yup.string().required("Tags are required"),
        content: yup
            .string()
            .required("Content is required")
            .min(50, "Content must be at least 50 characters long."),
        thumbnail: yup.string().required("Thumbnail is required"),
    };

    return yup.object().shape({
        [lang]: yup.lazy(() => {
            switch (type) {
                case "projects":
                    return yup.object().shape({
                        ...baseJson,
                        github: yup
                            .string()
                            .required("Github link is required")
                            .url("Invalid URL")
                            .matches(/github.com/, "Must be a github link"),
                    });
                case "faq":
                    return yup.object().shape({
                        question: yup.string().required("Question is required"),
                        answer: yup.string().required("Answer is required"),
                    });
                default:
                    return yup.object().shape(baseJson);
            }
        }),
    } as Record<string, any>);
};

const getTextfields = (type: ContentType) => {
    const baseFields = [
        {
            name: "title",
            label: "Title",
        },
        {
            name: "description",
            label: "Description",
        },
        {
            name: "tags",
            label: "Tags",
        },
        {
            name: "thumbnail",
            label: "Thumbnail",
        },
        {
            name: "content",
            label: "Content",
            props: {
                multiline: true,
                rows: 20,
            },
        },
    ];

    switch (type) {
        case "projects":
            return [
                ...baseFields.slice(0, 1),
                {
                    name: "github",
                    label: "Github",
                },
                ...baseFields.slice(1),
            ];
        case "faq":
            return [
                { name: "question", label: "Question" },
                { name: "answer", label: "Answer" },
            ];
        default:
            return baseFields;
    }
};

const getDefaultValues = (
    type: ContentType,
    lang: "tr" | "en"
): Record<string, any> => {
    switch (type) {
        case "projects":
            return {
                [lang]: {
                    github: "",
                    title: "",
                    description: "",
                    tags: "",
                    content: "",
                    thumbnail: "",
                },
            };
        case "faq":
            return {
                [lang]: {
                    question: "",
                    answer: "",
                },
            };
        default:
            return {
                [lang]: {
                    title: "",
                    description: "",
                    tags: "",
                    content: "",
                    thumbnail: "",
                },
            };
    }
};
export { getSchema, getTextfields, getDefaultValues };
