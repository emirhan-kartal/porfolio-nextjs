import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Project } from "@/types";

import nextConfig from "../../../../next.config.mjs";
import { get } from "http";
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
    const project = await mongo
        .collection("projects")
        .findOne({ _id: new ObjectId(req.query.id as string) });
    if (!project) {
        return res.status(404).send({ error: "project not found" });
    }
    res.status(200).send(project);
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.id) {
        return res.status(400).send({ error: "ID is required" });
    }
    const mongo = await getDatabase();
    const result = await mongo
        .collection("projects")
        .deleteOne({ _id: new ObjectId(req.query.id as string) });
    if (result.deletedCount === 0) {
        return res.status(404).send({ error: "project not found" });
    }
    const urlsToBeRevalidated: string[] = getRevalidatingPaths(
        req.query.id as string,
        "projects"
    );
    if (
        await Promise.all(urlsToBeRevalidated.map((url) => res.revalidate(url)))
    ) {
        res.status(200).json({ success: true });
    } else {
        res.status(500).send({ error: "Error revalidating" });
    }
}
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body) {
        return res.status(400).send({ error: "project data is required" });
    }
    const project: Project = req.body;
    const { _id, ...rest } = project;
    const mongo = await getDatabase();
    const result = await mongo.collection("projects").insertOne(rest);
    project._id = result.insertedId.toString();
    if (!result) {
        return res.status(500).send({ error: "Error inserting project" });
    }
    const urlsToBeRevalidated: string[] = getRevalidatingPaths(
        project._id,
        "projects"
    );
    if (
        await Promise.all(urlsToBeRevalidated.map((url) => res.revalidate(url)))
    ) {
        res.status(201).send(project);
    } else {
        res.status(500).send({ error: "Error revalidating" });
    }
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

    const urlsToBeRevalidated: string[] = getRevalidatingPaths(
        idString,
        "projects"
    );

    if (
        await Promise.all(urlsToBeRevalidated.map((url) => res.revalidate(url)))
    ) {
        res.status(200).send({ success: true });
    } else {
        res.status(500).send({ error: "Error revalidating" });
    }
}
