import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

async function createTables() {
    try {
        console.log("Creating daily_log table...");

        await sql`
      CREATE TABLE IF NOT EXISTS "pg-drizzle_daily_log" (
        "id" TEXT PRIMARY KEY,
        "user_id" TEXT NOT NULL REFERENCES "pg-drizzle_user"("id") ON DELETE CASCADE,
        "log_date" DATE NOT NULL,
        "activity_minutes" INTEGER,
        "activity_intensity" TEXT,
        "activity_details" JSONB,
        "total_calories" INTEGER,
        "total_protein" INTEGER,
        "nutrition_details" JSONB,
        "sleep_hours" REAL,
        "sleep_details" JSONB,
        "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
        UNIQUE("user_id", "log_date")
      )
    `;

        console.log("Creating indexes for daily_log...");

        await sql`
      CREATE INDEX IF NOT EXISTS "daily_log_user_date_idx" 
      ON "pg-drizzle_daily_log"("user_id", "log_date")
    `;

        await sql`
      CREATE INDEX IF NOT EXISTS "daily_log_date_idx" 
      ON "pg-drizzle_daily_log"("log_date")
    `;

        console.log("Creating streak_state table...");

        await sql`
      CREATE TABLE IF NOT EXISTS "pg-drizzle_streak_state" (
        "id" TEXT PRIMARY KEY,
        "user_id" TEXT NOT NULL UNIQUE REFERENCES "pg-drizzle_user"("id") ON DELETE CASCADE,
        "current_streak" INTEGER DEFAULT 0 NOT NULL,
        "longest_streak" INTEGER DEFAULT 0 NOT NULL,
        "consecutive_misses" INTEGER DEFAULT 0 NOT NULL,
        "grace_days_remaining" INTEGER DEFAULT 2 NOT NULL,
        "last_log_date" DATE,
        "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

        console.log("✅ All tables created successfully!");

    } catch (error) {
        console.error("❌ Error creating tables:", error);
        throw error;
    } finally {
        await sql.end();
    }
}

createTables();
