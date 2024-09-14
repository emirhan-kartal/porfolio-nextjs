import { ObjectId } from "mongodb";

export interface Skill {
    title: string;
    image: string;
}

export interface User {
    email: string;
    password: string;
}
export interface UserWithId extends User {
    _id: ObjectId;
}
export interface SkillRow {
    _id: string;
    name: string;
    image: string;
}
export interface BlogData {
    title: string;
    description: string;
    content: string;
    tags: string;
    thumbnail: string;
}
export interface ProjectData extends BlogData {
    github: string;
}

export type BaseContent = {
    _id: string;
    date: string;
    thumbnail: string;
    tr: ProjectData | BlogData;
    en: ProjectData | BlogData;
};

export type Project = BaseContent & {
    type: "projects";
    tr: ProjectData;
    en: ProjectData;
};

export type ProjectDataWithoutContent = Omit<ProjectData, "content">;
export type BlogDataWithoutContent = Omit<BlogData, "content">;

export type Blog = BaseContent & {
    type: "blogs";
    author: string;
    tr: BlogData;
    en: BlogData;
};

export type ContentKey =
    | "title"
    | "description"
    | "content"
    | "tags"
    | "thumbnail"
    | "date";
export type SkillRowWithoutId = Omit<SkillRow, "_id">;
export type BlogWithoutContent = Blog & {
    tr: BlogDataWithoutContent;
    en: BlogDataWithoutContent;
};
export type ProjectWithoutContent = Project & {
    tr: ProjectDataWithoutContent;
    en: ProjectDataWithoutContent;
};
export type TextfieldType = {
    name: ContentKey;
    label: string;
    variant: "outlined" | "filled" | "standard";
    disabled: boolean;
    props: any;
};
export type ContentType = "projects" | "blogs" | "faq";
export type ContentMap = {
    projects: Project;
    blogs: Blog;
    faq: FAQuestion;
};
export interface FAQuestionContent {
    question: string;
    answer: string;
}
export interface FAQuestion {
    type: "faq";
    tr: FAQuestionContent;
    en: FAQuestionContent;
}
export interface FAQuestionWithId extends FAQuestion {
    _id: string;
}
