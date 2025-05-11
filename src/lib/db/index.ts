import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"

// export const pool = new Pool({
//   database: "postgres",
//   connectionString: process.env.DATABASE_CONNECTION_STRING,
//   allowExitOnIdle: true,
// });

const queryClient = postgres(process.env.DATABASE_CONNECTION_STRING as string, {
    max: 5,
    idle_timeout: 20,
});

export const db = drizzle(queryClient, {
    schema,
});

// export const result = await db.execute('select 1');
