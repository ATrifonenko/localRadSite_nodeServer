const express = require("express");
const getPhoneBook = require("./getPhoneBook");
const addRow = require("./addRow");

const phonebook = express.Router();

phonebook.get("/getPhoneBook", getPhoneBook);
phonebook.get("/addRow", addRow);

module.exports = phonebook;
