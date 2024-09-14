import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const serverSession = await getServerSession(req, res, authOptions);
    if (!serverSession) {
        res.status(401).send({ error: "Unauthorized" });
        return;
    }
    if (req.method === "GET") {
        return getHandler(req, res);
    } else {
        res.status(405).end();
    }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.id) {
        res.status(400).json({ error: "ID is required" });
        return;
    }
    const db = await getDatabase();
    const result = await db.collection("faq").findOne({
        _id: new ObjectId(req.query.id as string),
    });
    if (!result) {
        res.status(404).json({ error: "Not found" });
        return;
    }
    res.status(200).json(result);
}
