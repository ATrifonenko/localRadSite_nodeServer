const express = require("express");
const editNews = require("./editNews");
const delNews = require("./delNews");
const addNews = require("./addNews");
const getTitle = require("./getTitle");
const getNewsPage = require("./getNewsPage");
const news = express.Router();

news.post("/editNews", editNews);
news.post("/addNews", addNews);
news.post("/delNews", delNews);
news.get("/getTitle/:page", getTitle);
news.get("/:page", getNewsPage);

module.exports = news;
