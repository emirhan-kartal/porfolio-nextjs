import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

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
    console.log("------------sending---------------");
    console.log(blog);
    res.status(200).send(blog);
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.id) {
        return res.status(400).send({ error: "ID is required" });
    }
    console.log(req.query.id);
    console.log("testpaosdjoapsdjop");
    const mongo = await getDatabase();
    const result = await mongo
        .collection("blogs")
        .deleteOne({ _id: new ObjectId(req.query.id as string) });
    if (result.deletedCount === 0) {
        return res.status(404).send({ error: "blog not found" });
    }

    res.status(200).json({ name: "Emirhan Kartal deleteHandler" });
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
    res.status(201).send(blog);
}
async function putHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body) {
        return res.status(400).send({ error: "blog data is required" });
    }
    const blog = req.body;
    const mongo = await getDatabase();
    const result = await mongo
        .collection("blogs")
        .updateOne({ _id: new ObjectId(blog._id) }, { $set: blog });
    if (result.modifiedCount === 0) {
        return res.status(404).send({ error: "blog not found" });
    }
    res.status(200).send({ success: true });
    
}
