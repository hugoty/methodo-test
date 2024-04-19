import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);

let conn;
let db;

async function connectToClient() {
    try {
        conn = await client.connect();
        db = conn.db(process.env.MONGO_DB || "");
    } catch (e) {
        console.error(e);
    }
}

connectToClient();


export default db;
