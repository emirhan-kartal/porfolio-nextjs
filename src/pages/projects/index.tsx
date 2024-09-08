import ContentWrapper from "@/components/ui/content-wrapper";
import ProjectContainer from "@/components/ui/project-container";

import { motion } from "framer-motion";
import GradientText from "@/components/ui/gradient-text";
import { container } from "@/components/utils/animations";
import { GetStaticProps } from "next";
import { getDatabase } from "@/lib/db";
import { useTranslations } from "next-intl";
import { Project, ProjectWithoutContent } from "@/types";

import { useEffect, useState } from "react";
export default function Page({
    initialProjects,
}: {
    initialProjects: ProjectWithoutContent[];
}) {
    const t = useTranslations("projects");
    const [projectState, setProjects] = useState<Project[]>(initialProjects);

    useEffect(() => {
        getPageAfter(projectState[projectState.length - 1]._id);
    }, []);
    const getPageAfter = async (cursor: string) => {
        const nextPageProject = await fetch("/api/blogs/next?cursor=" + cursor);
        const data = await nextPageProject.json();
        if (data.length === 0) {
            return;
        }
        setProjects((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    };
    return (
        <ContentWrapper content>
            <motion.div
                variants={container("w-delay")}
                initial="hidden"
                animate="visible"
            >
                <GradientText sx={{ fontSize: "3rem", mb: 2 }}>
                    {t("title")}
                </GradientText>
            </motion.div>
            <ProjectContainer
                projects={initialProjects ?? []}
                getNextPage={getPageAfter}
            />
        </ContentWrapper>
    );
}
export const getStaticProps: GetStaticProps<object> = async (ctx) => {
    const db = await getDatabase();
    const initialProjects = (
        await db.collection("projects").find().limit(6).toArray()
    ).map((project) => {
        ctx.locales?.forEach((locale) => {
            project[locale as "tr" | "en"] = {
                title: project[locale as "tr" | "en"].title,
                description: project[locale as "tr" | "en"].description,
                tags: project[locale as "tr" | "en"].tags,
                thumbnail: project[locale as "tr" | "en"].thumbnail,
            };
        });
        return {
            _id: project._id.toString(),
            date: project.date,
            thumbnail: project.thumbnail,
            tr: project.tr,
            en: project.en,
        } as Project;
    }) as Project[];
    return {
        props: {
            initialProjects,
            messages: (await import(`../../../messages/${ctx.locale}`)).default,
        },
    };
};
