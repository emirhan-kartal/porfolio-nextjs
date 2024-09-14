import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getDatabase } from "@/lib/db";
import { FAQuestion, FAQuestionWithId } from "@/types";
import { ObjectId } from "mongodb";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    const serverSession = await getServerSession(req, res, authOptions);
    /*     if (!serverSession || req.method === "GET") {
        res.status(401).send({ error: "Unauthorized" });
        return;
    } */
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
    const db = await getDatabase();

    const result = await db.collection("faq").find().toArray();
    const faqs = result.map((faq) => {
        return {
            ...faq,
            _id: faq._id.toString(),
        };
    });
    res.status(200).json(faqs);
}
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body) {
        return res.status(400).json({ error: "Email data is required" });
    }
    const { tr, en } = req.body as FAQuestion;
    const db = await getDatabase();
    const result = await db.collection("faq").insertOne({
        tr,
        en,
    });
    if (!result) {
        return res.status(500).json({ error: "Error saving email" });
    }
    res.revalidate("/contact");
    res.status(200).json({ _id: result.insertedId.toString() });
}

async function putHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body) {
        return res.status(400).json({ error: "Email data is required" });
    }
    const { _id, tr, en } = req.body as FAQuestionWithId;
    const db = await getDatabase();
    const result = await db.collection("faq").updateOne(
        { _id: new ObjectId(_id) },
        {
            $set: {
                tr,
                en,
            },
        }
    );
    res.revalidate("/contact");
    res.status(200).json({ success: true });
}
async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.id) {
        return res.status(400).json({ error: "ID is required" });
    }
    const db = await getDatabase();
    const result = await db.collection("faq").deleteOne({
        _id: new ObjectId(req.query.id as string),
    });
    if (!result) {
        return res.status(500).json({ error: "Error deleting email" });
    }
    res.revalidate("/contact");
    res.status(200).json({ success: true });
}
export default handler;
