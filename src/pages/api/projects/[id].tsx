import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            return getHandler(req, res);
        case "DELETE":
            return deleteHandler(req, res);
        default:
            return res.status(405).end();
    }
}
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    const mongo = await getDatabase();
    const project = await mongo
        .collection("projects")
        .findOne({ _id: new ObjectId(req.query.id as string) });
    if (!project) {
        return res.status(404).send({ error: "project not found" });
    }
    console.log("------------sending---------------");
    console.log(project);
    res.status(200).send(project);
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.id) {
        return res.status(400).send({ error: "ID is required" });
    }
    console.log(req.query.id);
    console.log("testpaosdjoapsdjop");
    const mongo = await getDatabase();
    const result = await mongo
        .collection("projects")
        .deleteOne({ _id: new ObjectId(req.query.id as string) });
    if (result.deletedCount === 0) {
        return res.status(404).send({ error: "project not found" });
    }

    res.status(200).json({ name: "Emirhan Kartal deleteHandler" });
}
