import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
export default {
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  migrations: {
    prefix: 'supabase'
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!
,
  },
  out: "./drizzle/migrations",
}

