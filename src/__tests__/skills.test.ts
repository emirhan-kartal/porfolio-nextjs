import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, Db, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import handler from "../pages/api/skills"; // Adjust the import path if necessary
import { createMocks } from "node-mocks-http";
import { getServerSession } from "next-auth";
import { getDatabase } from "@/lib/db";

jest.mock("next-auth");
jest.mock("@/lib/db");

let mongoServer: MongoMemoryServer;
let client: MongoClient;
let db: Db;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    client = new MongoClient(uri);
    await client.connect();
    db = client.db("testdb");
    (getDatabase as jest.Mock).mockResolvedValue(db);
});

afterAll(async () => {
    await client.close();
    await mongoServer.stop();
    jest.clearAllMocks();
});

describe("API handler tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (getServerSession as jest.Mock).mockResolvedValue({
            user: {
                email: "e.kartal115@gmail.com",
                name: "Emirhan Kartal",
                image: "none",
            },
            expires: new Date().getTime() + 1000,
        });
    });

    it("GET /skills should return skills data", async () => {
        const sampleData = [{ name: "Go", image: "go.png" }];
        await db.collection("skills").insertMany(sampleData);

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual(expect.arrayContaining(sampleData));
    });

    it("POST /skills should create a skill", async () => {
        const newSkill = { name: "Rust", image: "rust.png" };

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: newSkill,
        });

        await handler(req, res);

        const insertedSkill = await db
            .collection("skills")
            .findOne({ name: "Rust" });

        expect(res._getStatusCode()).toBe(200);
        expect(insertedSkill).toMatchObject(newSkill);
    });

    it("PUT /skills should update a skill", async () => {
        const skill = { name: "Java", image: "java.png" };
        const { insertedId } = await db.collection("skills").insertOne(skill);

        const updatedSkill = {
            _id: insertedId.toString(),
            name: "JavaScript",
            image: "javascript.png",
        };

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "PUT",
            body: updatedSkill,
        });

        await handler(req, res);

        const updatedDocument = await db
            .collection("skills")
            .findOne({ _id: new ObjectId(insertedId) });

        expect(res._getStatusCode()).toBe(200);
        expect(updatedDocument).toMatchObject({
            name: "JavaScript",
            image: "javascript.png",
        });
    });

    it("DELETE /skills should delete a skill", async () => {
        const skill = { name: "Python", image: "python.png" };
        const { insertedId } = await db.collection("skills").insertOne(skill);

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "DELETE",
            query: { id: insertedId.toString() },
        });

        await handler(req, res);

        const deletedSkill = await db
            .collection("skills")
            .findOne({ _id: insertedId });
        console.log(deletedSkill);
        expect(res._getStatusCode()).toBe(200);
        expect(deletedSkill).toBeNull();
    });
});
