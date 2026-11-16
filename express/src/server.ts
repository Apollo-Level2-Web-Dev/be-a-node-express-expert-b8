import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = async () => {
  initDB();
  app.listen(config.port, () => {
    console.log(`The Express server is running on the port ${config.port}`);
  });
};

main();
