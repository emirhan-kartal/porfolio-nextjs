import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, Db, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import handler from "../pages/api/blogs/[id]";
import { createMocks } from "node-mocks-http";
import { Blog } from "@/components/composites/featured-projects";
import { getServerSession } from "next-auth";
jest.mock("next-auth/next");

let mongoServer: MongoMemoryServer;
let client: any;
let db: Db;

beforeAll(async () => {
    // Start an in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Connect to the in-memory MongoDB server
    client = new MongoClient(uri);
    await client.connect();

    // Use a specific database name
    db = client.db("testdb");
});

afterAll(async () => {
    // Clean up the MongoDB client and server
    await client.close();
    await mongoServer.stop();
});
type BlogWithoutId = Omit<Blog, "_id">;
describe("API Integration Tests", () => {
    beforeEach(() => {
        (getServerSession as jest.Mock).mockResolvedValue({
            user: {
                email: "e.kartal115@gmail.com",
                name: "Emirhan Kartal",
                image: "none",
            },
            expires: new Date().getTime() + 1000,
        });
    });
    it("GET /blog/[id] should return a blog post", async () => {

        // Insert a test blog post
        const blogData: BlogWithoutId = {
            title: "Test Blog",
            content: "This is a test blog post.",
            description: "This is a test blog post.",
            tags: "asda",
            thumbnail: "https://example.com/image.jpg",
            link: "https://example.com",
            date: new Date().toISOString(),
            author: "Emirhan Kartal",
        };
        const { insertedId } = await db.collection("blogs").insertOne(blogData);

        // Mock the request and response objects
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: { id: insertedId.toString() },
        });

        // Mock the database connection
        const originalGetDatabase = require("@/lib/db").getDatabase;
        jest.spyOn(require("@/lib/db"), "getDatabase").mockResolvedValue(db);

        // Call the handler
        await handler(req, res);
        console.log(res._getData());
        // Validate the response
        expect(res._getStatusCode()).toBe(200);
        expect(res._getData()).toMatchObject(blogData);

        // Restore the original database connection
        require("@/lib/db").getDatabase = originalGetDatabase;
    });

    it("POST /blog should create a blog post", async () => {

        const newBlog: BlogWithoutId = {
            title: "Test Blog",
            content: "This is a test blog post.",
            description: "This is a test blog post.",
            tags: "asda",
            thumbnail: "https://example.com/image.jpg",
            link: "https://example.com",
            date: new Date().toISOString(),
            author: "Emirhan Kartal",
        };

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: newBlog,
        });
        res.revalidate = jest.fn();

        const originalGetDatabase = require("@/lib/db").getDatabase;
        jest.spyOn(require("@/lib/db"), "getDatabase").mockResolvedValue(db);

        await handler(req, res);

        expect(res._getStatusCode()).toBe(201);
        expect(res._getData()).toMatchObject(newBlog);

        const insertedBlog = await db
            .collection("blogs")
            .findOne({ title: "Test Blog" });

        expect(insertedBlog).toBeTruthy();

        require("@/lib/db").getDatabase = originalGetDatabase;
    });

    it("PUT /blog/[id] should update a blog post", async () => {

        const blogData: BlogWithoutId = {
            title: "Test Blog",
            content: "This is a test blog post.",
            description: "This is a test blog post.",
            tags: "asda",
            thumbnail: "https://example.com/image.jpg",
            link: "https://example.com",
            date: new Date().toISOString(),
            author: "Emirhan Kartal",
        };
        const { insertedId } = await db.collection("blogs").insertOne(blogData);

        const updatedBlog = {
            title: "Updated Blog",
            content: "This is a test blo123123123g post.",
            description: "This is a test blog post.",
            tags: "asda",
            thumbnail: "https://example.com/image.jpg",
            link: "https://example.com",
            date: new Date().toISOString(),
            author: "Emirhan Kartal",
        };

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "PUT",
            body: updatedBlog,
        });
        req.query = { id: insertedId.toString() };
        res.revalidate = jest.fn();
        const originalGetDatabase = require("@/lib/db").getDatabase;
        jest.spyOn(require("@/lib/db"), "getDatabase").mockResolvedValue(db);

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);

        const modifiedBlog = await db
            .collection("blogs")
            .findOne({ _id: insertedId });

        expect(modifiedBlog!.title).toBe("Updated Blog");
        expect(modifiedBlog!.content).toBe(
            "This is a test blo123123123g post."
        );
        require("@/lib/db").getDatabase = originalGetDatabase;
    });

    it("DELETE /blog/[id] should delete a blog post", async () => {

        const blogData = {
            title: "Blog to Delete",
            content: "This blog will be deleted.",
        };
        const { insertedId } = await db.collection("blogs").insertOne(blogData);

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "DELETE",
            query: { id: insertedId.toString() },
        });

        const originalGetDatabase = require("@/lib/db").getDatabase;
        jest.spyOn(require("@/lib/db"), "getDatabase").mockResolvedValue(db);

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);

        const deletedBlog = await db
            .collection("blogs")
            .findOne({ _id: insertedId });

        expect(deletedBlog).toBeNull();

        require("@/lib/db").getDatabase = originalGetDatabase;
    });
});
