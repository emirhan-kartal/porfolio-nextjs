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
interface ProjectGetResponse {
    projects: any[]; //project but _id is string
    projectCount: number;
}
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    const mongo = await getDatabase();
    console.log(req.body);
    console.log(req.body);

    const result = await mongo
        .collection("projects")
        .find()
        .sort({ _id: 1 })
        .limit(7)
        .toArray();
    if (!result) {
        return res.status(500).send({ error: "Error fetching projects" });
    }
    const projects = result.map((project) => {
        return {
            ...project,
            _id: project._id.toString(),
        };
    });
    const projectCount = await mongo.collection("projects").countDocuments();

    const response: ProjectGetResponse = {
        projects: projects,
        projectCount,
    };

    res.status(200).send(response);
}
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    const project: Project = req.body;
    if (!project) {
        return res.status(400).send({ error: "project data is required" });
    }
    const mongo = await getDatabase();

    const result = await mongo.collection("projects").insertOne(project);
    if (!result) {
        return res.status(500).send({ error: "Error inserting project" });
    }

    project._id = result.insertedId;
    res.revalidate("/projects/" + project._id.toString());
    res.revalidate("/projects");
    res.status(201).send(project);
}
type ProjectWithoutId = Omit<Project, "_id">;
async function putHandler(req: NextApiRequest, res: NextApiResponse) {
    const project: Project = req.body;
    if (!project) {
        return res.status(400).send({ error: "project data is required" });
    }
    const mongo = await getDatabase();
    const { _id, ...rest } = project;

    const result = await mongo
        .collection("projects")
        .updateOne({ _id: new ObjectId(project._id) }, { $set: rest });
    if (result.modifiedCount === 0) {
        return res.status(404).send({ error: "project not found" });
    }
    res.revalidate("/projects/" + project._id);
    res.revalidate("/projects");
    res.status(200).json({ name: "Emirhan Kartal putHandler" });
}
