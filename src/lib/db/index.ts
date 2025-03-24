import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// export const pool = new Pool({
//   database: "postgres",
//   connectionString: process.env.DATABASE_CONNECTION_STRING,
//   allowExitOnIdle: true,
// });

const queryClient = postgres(process.env.DATABASE_CONNECTION_STRING as string);

export const db = drizzle(queryClient);

// export const result = await db.execute('select 1');
