const express = require("express");
const getPhoneBook = require("./getPhoneBook");
const editPhoneBook = require("./editPhoneBook");
const delPerson = require("./delPerson");

const phonebook = express.Router();

phonebook.get("/getPhoneBook", getPhoneBook);
phonebook.post("/editPhoneBook", editPhoneBook);
phonebook.post("/delPerson", delPerson);

module.exports = phonebook;
