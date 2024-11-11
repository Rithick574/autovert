import server from "@/__boot/server.config";
import app from "@/server";
import database from "./database";

export const main = async () => {
  try {
    await server(app);
    await database();

    process.on("SIGTERM", async () => {
      console.info("SIGTERM received");
    });
  } catch (error: any) {
    console.log(`Oops!`, error?.message);
    process.exit(1);
  }
};
