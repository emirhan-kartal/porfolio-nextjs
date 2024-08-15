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
    console.log(session);
    if (session || req.method === "GET") {
        console.log("Session", session);
    } else {
        console.log("No session found");
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    console.log("çalışıyor");

    switch (req.method) {
        case "GET":
            return getHandler(req, res);
        case "POST":
            return postHandler(req, res);
        case "PUT":
            return putHandler(req, res);

        default:
            return res.status(405).end();
    }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    const mongo = await getDatabase();
    console.log(req.body);
    console.log(req.body);
    console.log("--------queryt");

    const projects = await mongo.collection("projects").find().toArray();
    console.log("sent11");
    res.status(200).send(projects);
}
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    const project: Project = req.body;
    if (!project) {
        return res.status(400).send({ error: "project data is required" });
    }
    const mongo = await getDatabase();
    project.link = `projects/${project.id}`;

    const result = await mongo.collection("projects").insertOne(project);
    project.id = result.insertedId.toString();

    res.status(201).send(project);
}
async function putHandler(req: NextApiRequest, res: NextApiResponse) {
    const project: Project = req.body;
    if (!project) {
        return res.status(400).send({ error: "project data is required" });
    }
    const mongo = await getDatabase();

    const result = await mongo
        .collection("projects")
        .updateOne({ _id: new ObjectId(project.id) }, { $set: project });
    if (result.modifiedCount === 0) {
        return res.status(404).send({ error: "project not found" });
    }

    res.status(200).json({ name: "Emirhan Kartal putHandler" });
}