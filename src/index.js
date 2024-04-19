import dotenv from "dotenv";
import { connectToDatabase } from "./mongo/db.js";
import createApp from "./app.js";

dotenv.config();

async function startServer() {
  try {
    await connectToDatabase();
    const app = await createApp(); // Make sure to await the app creation
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
