import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

import { router as searchRouter } from "./searchRouter.js";

const app = express();

app.use(cors());

app.use("/search", searchRouter);

//parse application/json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const HOSTNAME = "localhost";
const PORT = 8081;
const dbURL = "mongodb://localhost:27017/local";
const client = new MongoClient(dbURL);
const database = client.db("admin");
export const collection = database.collection("searchedWords");

// TO DO. add async
(async function () {
  try {
    await client.connect();

    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  } catch (err) {
    client.close();
    console.log("ERRR", err);
  }
})();
