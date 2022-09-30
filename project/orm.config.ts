
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config:SqliteConnectionOptions={
    type:"sqlite",
    database:"todo",
    entities:['dist/src/**/*.entities.js'],
    synchronize:true
}

export default config