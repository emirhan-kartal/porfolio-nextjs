
import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        return getHandler(req, res);
    }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    const cursor = parseInt(req.query.cursor as string); //id of the last item in the previous page
    if (!cursor) {
        return res.status(400).send({ error: "Cursor is required" });
    }
    const mongo = await getDatabase();
    const nextPage = await mongo
        .collection("blogs")
        .find({ _id: { $gt: new ObjectId(req.query.cursor as string) } })
        .sort({ _id: 1 })
        .limit(5)
        .toArray();
    res.status(200).send(nextPage);
}
