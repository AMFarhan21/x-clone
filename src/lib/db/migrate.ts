import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "."

const main = async() => {
    await migrate(db, {migrationsFolder: "drizzle"});
}


main().then(() => {
    
})