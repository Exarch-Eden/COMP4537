const http = require("http");
const express = require("express");
const url = require("url");
const date_server = require("./public/COMP4537/labs/4/getDate/server");

const port = process.env.PORT || 8000;

const app = express();

app.use(express.static("public"));

app.get("/COMP4537/labs/4/getDate/", function (req, res) {
  date_server.date_server(req, res);
});

// app.get("https://billyvunguyen.com/COMP4537/labs/5/", function (req, res) {
//   let query = url.parse(req.url, true);
//   let queryData = query.query;
//   let name = queryData.name;
//   let score = queryData.score;

//   console.log(queryData);
//   // res.statusCode = 200;

//   // // if query is empty
//   // if (Object.keys(q.query).length === 0) {
//   //   res.writeHead(200, {
//   //     "Content-Type": "text/html",
//   //     "Access-Control-Allow-Origin": "*",
//   //   });
//   //   res.end("end");
//   // }
// });

http.createServer(app).listen(port);
