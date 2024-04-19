import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);
let db;

export async function connectToDatabase() {
    try {
        const conn = await client.connect();
        db = conn.db(process.env.MONGO_DB || "");
        console.log("MongoDB connected successfully");
    } catch (e) {
        console.error('Failed to connect to MongoDB', e);
        process.exit(1);  // Consider a retry logic or a graceful shutdown
    }
}

export async function getDb() {
    await connectToDatabase();
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
}
