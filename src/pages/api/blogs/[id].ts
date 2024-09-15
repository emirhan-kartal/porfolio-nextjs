import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import getRevalidatingPaths from "@/lib/getRevalidatingPaths";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).send({ error: "Unauthorized" });
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
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    const mongo = await getDatabase();
    const blog = await mongo
        .collection("blogs")
        .findOne({ _id: new ObjectId(req.query.id as string) });
    if (!blog) {
        return res.status(404).send({ error: "blog not found" });
    }

    res.status(200).send(blog);
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
        return res.status(404).send({ error: "blog not found" });
    }
    const urlsToBeRevalidated: string[] = getRevalidatingPaths(
        req.query.id as string,
        "blogs"
    );
    if (
        await Promise.all(urlsToBeRevalidated.map((url) => res.revalidate(url)))
    ) {
        return res.status(200).send({ success: true });
    }
    return res.status(500).send({ error: "Error revalidating" });
}
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body) {
        return res.status(400).send({ error: "blog data is required" });
    }
    const blog = req.body;
    const mongo = await getDatabase();
    const result = await mongo.collection("blogs").insertOne(blog);
    blog._id = result.insertedId.toString();
    if (!result) {
        return res.status(500).send({ error: "Error inserting blog" });
    }
    const urlsToBeRevalidated: string[] = getRevalidatingPaths(
        blog._id,
        "blogs"
    );
    if (
        await Promise.all(urlsToBeRevalidated.map((url) => res.revalidate(url)))
    ) {
        return res.status(201).send(blog);
    }
    return res.status(500).send({ error: "Error revalidating" });
}
async function putHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body) {
        return res.status(400).send({ error: "blog data is required" });
    }
    if (!req.query.id) {
        return res.status(400).send({ error: "ID is required" });
    }
    const blog = req.body;
    const mongo = await getDatabase();
    const result = await mongo
        .collection("blogs")
        .updateOne(
            { _id: new ObjectId(req.query.id as string) },
            { $set: blog }
        );
    if (result.modifiedCount === 0) {
        return res.status(404).send({ error: "blog not found" });
    }
    const urlsToBeRevalidated: string[] = getRevalidatingPaths(
        req.query.id as string,
        "blogs"
    );
    if (
        await Promise.all(urlsToBeRevalidated.map((url) => res.revalidate(url)))
    ) {
        return res.status(200).send(blog);
    }
    return res.status(500).send({ error: "Error revalidating" });
}
