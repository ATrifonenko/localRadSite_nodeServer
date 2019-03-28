const express = require("express");
const getPhoneBook = require("./getPhoneBook");

const phonebook = express.Router();

phonebook.get("/getPhoneBook", getPhoneBook);

module.exports = phonebook;
