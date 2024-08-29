import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Project } from "@/components/composites/featured-projects";

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
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body) {
        return res.status(400).send({ error: "project data is required" });
    }
    const project: Project = req.body;
    const mongo = await getDatabase();
    const result = await mongo.collection("projects").insertOne(project);
    project._id = result.insertedId;
    if (!result) {
        return res.status(500).send({ error: "Error inserting project" });
    }
    res.revalidate("/projects/" + project._id.toString());
    res.status(201).send(project);
}
async function putHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body) {
        return res.status(400).send({ error: "project data is required" });
    }
    if (!req.query.id) {
        return res.status(400).send({ error: "ID is required" });
    }
    const project: Project = req.body;
    const idString = req.query.id as string;
    const mongo = await getDatabase();
    const result = await mongo
        .collection("projects")
        .updateOne({ _id: new ObjectId(idString) }, { $set: project });
    if (result.modifiedCount === 0) {
        return res.status(404).send({ error: "project not found" });
    }
    res.revalidate("/projects/" + idString);

    res.status(200).send({ success: true });
}
