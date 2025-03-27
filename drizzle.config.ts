import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import * as dotenv from "dotenv";

dotenv.config({path: '.env.local'})

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_CONNECTION_STRING as string
  }
});

console.log('DB_URL: ', process.env.DATABASE_CONNECTION_STRING)