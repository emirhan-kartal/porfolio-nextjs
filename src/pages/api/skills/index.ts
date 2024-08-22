import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

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
    const data = await mongo.collection("skills").find().toArray();
    if (!data) {
        res.status(500).json({ error: "Error fetching data" });
        return;
    }
    res.status(200).json(data);
}
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body) {
        res.status(400).json({ error: "Skill data is required" });
        return;
    }
    const body = JSON.parse(req.body);
    const mongo = await getDatabase();
    try {
        const data = await mongo.collection("skills").insertOne(body);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
async function putHandler(req: NextApiRequest, res: NextApiResponse) {
    console.log("PUT", req.body._id);
    console.log("PUT", req.body.name);
    console.log("PUT", req.body.image);

    if (!req.body) {
        res.status(400).json({ error: "Skill data is requ5ired" });
        console.error("Skill data is required");
        return;
    }
    if (!req.body._id || !req.body.name || !req.body.image) {
        res.status(400).json({ error: "Skill is required" });
        console.error("Skill is required");
        return;
    }
    const mongo = await getDatabase();
    try {
        const query = mongo
            .collection("skills")
            .updateOne(
                { _id: new ObjectId(req.body._id) },
                { $set: { name: req.body.name, image: req.body.image } }
            );
        res.status(200).json(query);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}
async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.query.id, " id bu");

    if (!req.query.id) {
        res.status(400).json({ error: "Skill data is required" });
        return;
    }
    const mongo = await getDatabase();
    const query = mongo
        .collection("skills")
        .deleteOne({ _id: new ObjectId(req.query.id as string) });
    if (!query) {
        res.status(500).json({ error: "Error deleting data" });
        return;
    }
    res.status(200).json({ name: "Emirhan Kartal deleteHandler" });
}
