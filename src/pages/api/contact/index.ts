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
    console.log(req.body, "req.body");
    if (!req.body) {
        return res.status(400).json({ error: "Email data is required" });
    }
    console.log("test");
    const packageJson = {
        from: "Acme <onboarding@resend.dev>",
        to: ["e.kartal115@gmail.com"],
        subject:
            "Email from " +
            req.body.name +
            " " +
            req.body.email,
        html: req.body.content,
    };

    console.log(packageJson, "package");
    const { data, error } = await resend.emails.send(packageJson);

    if (error) {
        console.log(error);
        return res.status(400).json(error);
    }

    res.status(200).json(data);
}
export default rateLimitMiddleware(handler);
