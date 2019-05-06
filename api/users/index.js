const express = require("express");
const checkAuth = require("./checkAuth");
const signUp = require("./signup");
const login = require("./login");
const logout = require("./logout");
const editUsers = require("./editUsers");

const users = express.Router();

users.get("/checkAuth", checkAuth);
users.post("/signUp", signUp);
users.post("/login", login);
users.get("/logout", logout);
users.post("/editUsers", editUsers);

module.exports = users;
