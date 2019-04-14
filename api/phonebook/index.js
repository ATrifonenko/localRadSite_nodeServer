const express = require("express");
const getPhoneBook = require("./getPhoneBook");
const editPhoneBook = require("./editPhoneBook");

const phonebook = express.Router();

phonebook.get("/getPhoneBook", getPhoneBook);
phonebook.post("/editPhoneBook", editPhoneBook);

module.exports = phonebook;
