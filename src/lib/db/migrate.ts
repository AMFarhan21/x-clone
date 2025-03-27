import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "."

const main = async() => {
    console.log("Migrations running...")
    await migrate(db, {migrationsFolder: "drizzle"});
    console.log("Migrations finished!")
}


main().then(() => {
    console.log("Finished Migrating");
}).catch((error) => {
    console.log("ERROR MIGRATING: ", error)
}).finally(() => {
    process.exit()
})