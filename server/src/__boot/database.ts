import mongoose from "mongoose";
import { config } from "@/__boot/config";

export default async () => {
    try {
        const conn = await mongoose.connect(`${config.mongo.host}://${config.mongo.database}:${config.mongo.password}@cluster0.8tx3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log(`
                    __ 🍃                      __
       ___ _ __ __ / /_ ___  _  __ ___   ____ / /_
      / _ \`// // // __// _ \| |/ // -_) / __// __/
      \_,_/ \_,_/ \__/ \___/|___/ \__/ /_/   \__/
      `);
        console.log(`@-${conn.connection.host}`)
    } catch (error: any) {
        console.error(`🍁 Database Connection failed 🍁`);
        console.error(error.message);
        process.exit(1);
    }
}