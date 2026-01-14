import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

const client = postgres(connectionString);
const db = drizzle(client);

async function main() {
    try {
        console.log("Adding gender and units columns to user_profile...");
        await client`ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS gender text;`;
        await client`ALTER TABLE user_profile ADD COLUMN IF NOT EXISTS units text;`;
        console.log("✅ Columns added successfully.");
    } catch (error) {
        console.error("Error adding columns:", error);
    } finally {
        await client.end();
    }
}

main();
