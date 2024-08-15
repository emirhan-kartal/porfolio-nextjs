import { MongoClient } from "mongodb";
let client: MongoClient;

async function getDatabase() {
    if (!process.env.MONGODB_URI) {
        throw new Error(
            "Please define the MONGODB_URI environment variable inside .env.local"
        );
    }
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
    }
    return client.db("nextjs");
}

export { getDatabase };
