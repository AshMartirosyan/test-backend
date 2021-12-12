import express from "express";
import fetch from "node-fetch";

import { Consts } from "./consts.js";
import { collection } from "./index.js";

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/", async (req, res) => {
  const searchWord = req.headers["word"];

  await collection.insertOne({
    searchedWord: searchWord,
    date: Date.now(),
  });

  try {
    const weather = await getCurrentWeather(searchWord.toUpperCase());
    res.status(200).send(weather);
  } catch (error) {
    res.status(404).send(error);
  }
});

const getCurrentWeather = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Consts.metioApiKey}`,
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      return new Error(error);
    });
};

export { router };
