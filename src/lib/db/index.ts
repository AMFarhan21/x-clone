import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"

// export const pool = new Pool({
//   database: "postgres",
//   connectionString: process.env.DATABASE_CONNECTION_STRING,
//   allowExitOnIdle: true,
// });

const queryClient = postgres(process.env.DATABASE_CONNECTION_STRING as string);

export const db = drizzle(queryClient, {
    schema,
});

// export const result = await db.execute('select 1');
