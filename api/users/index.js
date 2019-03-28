const express = require("express");
const checkAuth = require("./checkAuth");
const signUp = require("./signUp");
const login = require("./login");
const logout = require("./logout");

const users = express.Router();

users.get("/checkAuth", checkAuth);
users.post("/signUp", signUp);
users.post("/login", login);
users.get("/logout", logout);

module.exports = users;
