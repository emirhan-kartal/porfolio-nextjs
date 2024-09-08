import { ObjectId } from "mongodb";

export interface Skill {
    title: string;
    image: string;
}
export interface FAQuestion {
    question: string;
    answer: string;
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
export interface ProjectContent extends BlogContent {
    github: string;
}
export interface BlogContent {
    title: string;
    description: string;
    content: string;
    tags: string;
    thumbnail: string;
}

export type Project = {
    _id: string;
    date: string;
    thumbnail: string;
    tr: ProjectContent;
    en: ProjectContent;
};
export type Blog = Project & {
    author: string;
    tr: BlogContent;
    en: BlogContent;
};

export type ContentKey =
    | "title"
    | "description"
    | "content"
    | "tags"
    | "thumbnail"
    | "date";
export type ProjectWithoutContent = Omit<Project, "content">;
export type SkillRowWithoutId = Omit<SkillRow, "_id">;
export type BlogWithoutContent = Omit<Blog, "content">;
export type TextfieldType = {
    name: ContentKey;
    label: string;
    variant: "outlined" | "filled" | "standard";
    disabled: boolean;
    props: any;
};
