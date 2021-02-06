// const http = require("http");
const url = require("url");
const utils = require("./modules/utils");

// const date_server = http.createServer((req, res) => {
//   let query = url.parse(req.url, true);
//   let qData = query.query;
//   let name = qData.name;

//   let date = utils.getDate();

//   let message = name === undefined ?
//    "Please specify a name query paramater" 
//    :
//    `Hello ${name}, Here is the server's current date and time: ${date}`;

//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end(message);
// }).listen(8000);

exports.date_server = function (req, res) {
  let query = url.parse(req.url, true);
  let qData = query.query;
  let name = qData.name;

  let date = utils.getDate();

  let message = name === undefined ?
   "Please specify a name query paramater" 
   :
   `Hello ${name}, Here is the server's current date and time: ${date}`;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(message);
}
