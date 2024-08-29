import { getDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    console.log("skills count")
    if (req.method === "GET") {
        return getHandler(req, res);
    }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    const mongo = await getDatabase();
    const query = await mongo.collection("skills").countDocuments({});
    const response = {
        value: query + "",
    };
    console.log(response,"sent")
    console.log("--------------------------------")
    res.status(200).send(response);
}
