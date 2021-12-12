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

// /const HOSTNAME = "metioserver.herokuapp.com";
const PORT = process.env.PORT || 8081;
const dbURL =
  "mongodb+srv://test:test123123@cluster0.6y6lr.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(dbURL);
const database = client.db("test");
export const collection = database.collection("searchedWords");

// TO DO. add async
(async function () {
  try {
    await client.connect();

    app.listen(PORT, () => {
      console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  } catch (err) {
    client.close();
    console.log("ERRR", err);
  }
})();
