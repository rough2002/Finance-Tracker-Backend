const express = require("express");
const cors = require("cors");
const app = express();
// Middleware for parsing json
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cors());

module.exports = { app };
