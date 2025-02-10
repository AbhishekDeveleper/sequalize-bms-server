import cluster from "node:cluster";
import numCPUs from "node:os";
import process from "node:process";
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { connectDb } from "./config/database.js";
import { authorModel, genreModel, bookModel } from "./models/bmsModel.js";

(async () => {
  if (cluster.isPrimary) {
    try {
      await connectDb();
      await authorModel.sync({ alter: true });
      await genreModel.sync({ alter: true });
      await bookModel.sync({ alter: true });
    } catch (err) {
      console.log(err);
    }
    for (let i = 0; i < numCPUs.availableParallelism(); i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(
        `worker with process id ${process.pid} is died bysignal ${signal}`
      );
    });
  } else {
    const server = app.listen(3000, () => {
      console.log(
        `server listening on port 3000 with process id => ${process.pid}`
      );
    });
    process.on(
      "unhandledRejection",
      (error: { name?: string; message?: string }) => {
        console.log(`Unhandled rejection  🎇 shutting down system`);
        console.log(error);
        server.close(() => {
          process.exit(1);
        });
      }
    );
  }
})();
