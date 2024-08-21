import Head from "next/head";
import { Inter } from "next/font/google";
import LandingIntro from "@/components/composites/landing-intro";
import GradientColon from "@/components/ui/gradient-colon";
import { Project } from "@/components/composites/featured-projects";
import { Skill } from "@/components/composites/landing-about";
import { GetStaticProps, GetStaticPropsResult } from "next";
import dynamic from "next/dynamic";
import LazyLoad from "@/components/utils/LazyLoad";
import { getDatabase } from "@/lib/db";

const DynamicFeaturedProjects = dynamic(
    import("@/components/composites/featured-projects")
);
const DynamicLandingAbout = dynamic(
    import("@/components/composites/landing-about"),
    { ssr: false }
);
const inter = Inter({ subsets: ["latin"] });

interface HomePageProps {
    whatIdo: Skill[];
    projects: Project[];
}

export default function Home({ whatIdo, projects }: HomePageProps) {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <LandingIntro />
                <GradientColon />

                <LazyLoad>
                    <DynamicFeaturedProjects projects={projects} />
                </LazyLoad>
                <LazyLoad>
                    <DynamicLandingAbout whatIdo={whatIdo} />
                </LazyLoad>
            </main>
        </>
    );
}
export const getStaticProps: GetStaticProps<HomePageProps> = async (): Promise<
    GetStaticPropsResult<HomePageProps>
> => {
    const mongo = await getDatabase();
    const whatIdo = (await mongo.collection("skills").find().toArray()).map(
        (skill) => {
            return {
                title: skill.name,
                image: skill.image,
            } as Skill;
        }
    ) as Skill[];
    console.log("this is whatIdo", whatIdo);
    const projects = (await mongo.collection("projects").find().toArray()).map(
        (project) => {
            return {
                title: project.title,
                description: project.description,
                thumbnail: project.thumbnail,
                link: project.link,
                tags: project.tags,
                date: project.date,
            } as Project;
        }
    ) as Project[];

    return {
        props: {
            whatIdo,
            projects,
        },
    };
};
