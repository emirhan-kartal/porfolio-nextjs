import rateLimitMiddleware from "@/middleware/rate-limit-middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        return postHandler(req, res);
    }
}
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body) {
        return res.status(400).json({ error: "Email data is required" });
    }

    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["e.kartal115@gmail.com"],
        subject:
            "Email from " +
            req.body.name +
            " " +
            req.body.email +
            " " +
            req.body.budget,
        html: req.body.content,
    });

    if (error) {
        return res.status(400).json(error);
    }

    res.status(200).json(data);
}
export default rateLimitMiddleware(handler);
