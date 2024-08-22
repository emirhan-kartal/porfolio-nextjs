import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { IncomingForm } from "formidable";
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    switch (req.method as "POST" | "PUT") {
        case "POST":
            return postHandler(req, res);
        case "PUT":
            return putHandler(req, res);
        default:
            return res.status(405).end();
    }
}
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: err });
            console.error(err);
            return;
        }
        if (!fields || !files) {
            res.status(400).json({ error: "Skill data is required" });
            return;
        }
        if (!files.image) {
            res.status(400).json({ error: "Image is required" });
            return;
        }

        req.body = fields;

        const fileName = files.image[0].originalFilename;
        const filePath = files.image[0].filepath;

        // Construct the new image path in the /public/skills directory
        const publicPath = path.join(process.cwd(), "public", "skills");
        const newImage = path.join(publicPath, fileName!);

        // Ensure the /public/skills directory exists
        if (!fs.existsSync(publicPath)) {
            fs.mkdirSync(publicPath, { recursive: true });
        }

        const writeFile = promisify(fs.writeFile);
        try {
            // Read the image file and write it to the /public/skills directory
            const readFileAsync = promisify(fs.readFile);
            const fileData = await readFileAsync(filePath);
            await writeFile(newImage, fileData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to save the image" });
            return;
        }

        // Insert the skill data into MongoDB
        const mongo = await getDatabase();
        try {
            const data = await mongo.collection("skills").insertOne({
                name: req.body.name[0],
                image: "/skills/" + fileName,
            });

            if (!data) {
                res.status(500).json({ error: "Error saving skill data" });
                return;
            }

            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to save skill data" });
        }
    });
}

interface SkillPutBody {
    id: string;
    name: string;
    image: string;
}
async function putHandler(req: NextApiRequest, res: NextApiResponse) {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: err });
            console.error(err);
            return;
        }
        if (!fields || !files) {
            res.status(400).json({ error: "Skill data is required" });
            return;
        }
        if (!files.image) {
            res.status(400).json({ error: "Image is required" });
            return;
        }

        req.body = fields;
        const fileName = files.image[0].originalFilename;
        console.log(
            files.image[0].originalFilename,
            "s1113331131313131elamke1ee"
        );
        console.log(req.body);
        const mongo = await getDatabase();
        // formidable parses all the thinhs as arrays i guess.
        const data = await mongo.collection("skills").findOneAndUpdate(
            { _id: new ObjectId(req.body._id[0] as string) },
            {
                $set: {
                    name: req.body.name[0],
                    image: "/skills/" + fileName,
                },
            },
            {
                returnDocument: "before",
            }
        );
        console.log("4");
        if (!data) {
            res.status(500).json({ error: "Error fetching data" });
            console.error("Error fetching data");
            return;
        }
        const newImage = path.join(process.cwd(), "public/skills/" + fileName);

        const writeFile = promisify(fs.writeFile);
        try {
            //read the image file and write it to the directory
            const readFileAsync = promisify(fs.readFile);
            const file = await readFileAsync(files.image[0].filepath);
            await writeFile(newImage, file);
        } catch (error) {
            console.error(error);
        }

        if (data.image !== "/skills/" + fileName) {
            console.log("1");
            const oldImage = path.join(process.cwd(), data.image) as string;

            console.log(data.image);

            console.log(oldImage, "oldImage");
            if (fs.existsSync(oldImage)) {
                const unlinkAsync = promisify(fs.unlink);
                try {
                    await unlinkAsync(oldImage);
                } catch (error) {
                    console.log("----------------------------------------");
                    console.error(error);
                }
            }
        }
    });

    res.status(200).json({ success: true });
}
