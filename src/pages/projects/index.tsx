import ContentWrapper from "@/components/ui/content-wrapper";
import ProjectContainer from "@/components/ui/project-container";
import { ProjectWithoutContent } from "@/components/composites/featured-projects";
import { motion } from "framer-motion";
import GradientText from "@/components/ui/gradient-text";
import { container } from "@/components/utils/animations";
import { GetStaticProps } from "next";
import { getDatabase } from "@/lib/db";
export default function Page({
    projects,
}: {
    projects: ProjectWithoutContent[];
}) {
    return (
        <ContentWrapper content>
            <motion.div
                variants={container("w-delay")}
                initial="hidden"
                animate="visible"
            >
                <GradientText sx={{ fontSize: "3rem", mb: 2 }}>
                    My Projects
                </GradientText>
            </motion.div>
            <ProjectContainer projects={projects ?? []} />
        </ContentWrapper>
    );
}
export const getStaticProps: GetStaticProps<object> = async () => {
    const db = await getDatabase();
    const query = await db
        .collection("projects")
        .find({}, { projection: { content: 0 } })
        .toArray();
    console.log("it runs bro");
    const projects = query.map((project) => {
        return {
            title: project.title,
            description: project.description,
            image: project.thumbnail,
            link: project.link,
            tags: project.tags,
            id: project._id.toString(),
            date: project.date,
        };
    });
    return {
        props: { projects },
    };
};
