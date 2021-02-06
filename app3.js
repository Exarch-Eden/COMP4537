const http = require("http");
const express = require("express");
const date_server = require("./public/COMP4537/labs/4/getDate/server");

const port = process.env.PORT || 8000;

const app = express();

app.use(express.static("public"));

app.get("/COMP4537/labs/4/getDate/", function (req, res) {
  date_server.date_server(req, res);
});

http.createServer(app).listen(port);
