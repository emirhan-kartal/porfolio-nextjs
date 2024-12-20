import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Blog } from "@/types";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (session || req.method === "GET") {
    } else {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    switch (req.method) {
        case "GET":
            return getHandler(req, res);
        case "POST":
            return postHandler(req, res);
        case "PUT":
            return putHandler(req, res);
        case "DELETE":
            return deleteHandler(req, res);
        default:
            return res.status(405).end();
    }
}
interface BlogGetResponse {
    blogs: any[]; //blog but _id is string
    blogCount: number;
}
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    const mongo = await getDatabase();
    const result = await mongo
        .collection("blogs")
        .find()
        .sort({ _id: 1 })
        .limit(7)
        .toArray();
    if (!result) {
        return res.status(500).send({ error: "Error fetching blogs" });
    }
    const blogs = result.map((project) => {
        return {
            ...project,
            _id: project._id.toString(),
        };
    });
    const blogCount = await mongo.collection("blogs").countDocuments();

    const response: BlogGetResponse = {
        blogs: blogs,
        blogCount: blogCount,
    };

    res.status(200).send(response);
}
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    const blog: Blog = req.body;
    if (!blog) {
        return res.status(400).send({ error: "Blog data is required" });
    }
    const {_id, ...rest} = blog;
    const mongo = await getDatabase();
    const result = await mongo.collection("blogs").insertOne(rest);
    if (!result) {
        return res.status(500).send({ error: "Error inserting blog" });
    }
    res.revalidate("/blogs/" + blog._id);
    res.revalidate("/blogs");
    res.revalidate("/");
    res.status(201).send(blog);
}
async function putHandler(req: NextApiRequest, res: NextApiResponse) {
    const blog: Blog = req.body;

    if (!blog) {
        return res.status(400).send({ error: "Blog data is required" });
    }
    const mongo = await getDatabase();
    const result = await mongo
        .collection("blogs")
        .updateOne({ _id: new ObjectId(blog._id) }, { $set: blog });

    if (result.modifiedCount === 0) {
        return res.status(404).send({ error: "Blog not found" });
    }
    res.revalidate("/blogs/" + blog._id);
    res.revalidate("/blogs");
    res.revalidate("/");
    res.status(200).json({ name: "Emirhan Kartal putHandler" });
}
async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.id) {
        return res.status(400).send({ error: "ID is required" });
    }
    const mongo = await getDatabase();
    const result = await mongo
        .collection("blogs")
        .deleteOne({ _id: new ObjectId(req.query.id as string) });
    if (result.deletedCount === 0) {
        return res.status(404).send({ error: "Blog not found" });
    }
    const resList = ["/blogs/" + req.query.id, "/blogs", "/"];
    resList.forEach(async(url) => {
        await res.revalidate(url);
    });


    res.status(200).json({ name: "Emirhan Kartal deleteHandler" });
}
