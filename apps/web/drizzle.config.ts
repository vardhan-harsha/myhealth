import { type Config } from "drizzle-kit";

import { env } from "@/env";

// Log which database we're connecting to (helpful for debugging)
const appEnv = env.NEXT_PUBLIC_APP_ENV ?? "development";
console.log(`[Drizzle] Connecting to ${appEnv} database`);

export default {
  schema: "../../packages/db/src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  // tablesFilter: ["helix_*"],
} satisfies Config;
