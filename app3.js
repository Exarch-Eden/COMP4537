const http = require("http");
const express = require("express");
const url = require("url");
const mysql = require("mysql");
const util = require("util");
const date_server = require("./public/COMP4537/labs/4/getDate/server");

const port = process.env.PORT || 8000;

const app = express();

const statusOkay = 200;
const statusBadRequest = 400;
const statusServerError = 500;

// query constants
const qTable = "questions";
const cTable = "choices";

const updateSuccessful = "Update successful";
const noUpdatesFound = "No updates found";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

// LOCAL DATABASE:
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "assignment1",
// });

const CLEARDB_DATABASE_URL = "mysql://b321f7db97ad5d:edfd3381@us-cdbr-east-03.cleardb.com/heroku_e5d6a32740d847b?reconnect=true";

// HEROKU DATABASE:
const con = mysql.createPool({
  host: "us-cdbr-east-03.cleardb.com",
  user: "b321f7db97ad5d",
  password: "edfd3381",
  database: "heroku_e5d6a32740d847b",
});

con.getConnection((err) => {
  if (err) throw err;
  console.log("Connected to SQL database!");
});

// promisify query calls
const query = util.promisify(con.query).bind(con);

// OLD CODE
// async function getQuestions() {
//   // holds all the questions with their choices from the database
//   const questions = [];

//   const questionQuery = `SELECT * FROM questions`;

//   con.query(questionQuery, (err, result) => {
//     if (err) throw err;
//     console.log("successfully executed questions query");

//     console.log("result:");
//     console.log(result);
//     // console.log("result.length:");
//     // console.log(result.length);

//     console.log("AWAIT HERE");

//     // grab all choices for every question in results JSON
//     result.forEach((question) => {
//       // holds the current index of the question to be added in array
//       const questionIndex = questions.length;
//       const questionId = question.question_id;

//       // add question to questions array
//       questions[questionIndex] = { id: questionId, qBody: question.body };

//       const choicesQuery = `SELECT * FROM choices WHERE question_id=${questionId};`;

//       // grab the choices for the current question
//       con.query(choicesQuery, (err, resultChoices) => {
//         if (err) throw err;

//         console.log("choices:");
//         console.log(resultChoices);

//         // add choice data to respective question in questions array
//         questions[questionIndex].choices = resultChoices.map((choice) => {
//           return {
//             isAnswer: choice.is_answer,
//             text: choice.input_text,
//           };
//         }); // end map
//       });
//     }); // end forEach

//     console.log("AFTER AWAIT");
//   });

//   return questions;
// }

app.use(express.static("public"));

app.get("/COMP4537/labs/4/getDate/", (req, res) => {
  date_server.date_server(req, res);
});

// GET questions from database
app.get("/questions", (req, res) => {
  (async () => {
    console.log("inside app.js GET method");

    // holds all the questions with their choices from the database
    const questions = [];

    // const questions = getQuestions();

    // console.log("after getQuestions()");

    const questionQuery = `SELECT * FROM questions`;

    let result = {};
    try {
      result = await query(questionQuery);
    } catch (err) {
      console.log(err);
      res.statusCode = statusServerError;
      res.end(err);
    }

    // if (err) throw err;
    console.log("successfully executed questions query");

    console.log("result:");
    console.log(result);
    // console.log("result.length:");
    // console.log(result.length);

    // console.log("AWAIT HERE");

    // grab all choices for every question in results JSON
    for (const question of result) {
      // holds the current index of the question to be added in array
      const questionIndex = questions.length;
      const questionId = question.question_id;

      // add question to questions array
      questions[questionIndex] = { id: questionId, qBody: question.body };

      const choicesQuery = `SELECT * FROM choices WHERE question_id=${questionId};`;

      // grab the choices for the current question
      let resultChoices = {};
      try {
        resultChoices = await query(choicesQuery);
      } catch (err) {
        console.log(err);
        res.statusCode = statusServerError;
        res.end(err);
      }
      // if (err) throw err;

      console.log("choices:");
      console.log(resultChoices);

      // add choice data to respective question in questions array
      questions[questionIndex].choices = resultChoices.map((choice) => {
        console.log("curChoice:");
        console.log(choice);
        return {
          isAnswer: choice.is_answer === 0 ? true : false,
          text: choice.input_text,
        };
      }); // end map
      // }); // end query
    } // end forEach

    // console.log("AFTER AWAIT");
    // }); // end query

    console.log("questions[]:");
    console.log(questions);

    console.log("questions[0].choices");
    console.log(questions[0].choices);

    console.log("finished all queries in GET method");
    // res.writeHead(okCode, {
    //   'Content-Type': 'json'
    // })
    res.statusCode = statusOkay;
    res.json(questions);
  })();
});

app.post("/questions", function (req, res) {
  (async () => {
    console.log("inside app.js POST method");

    console.log("req.body");
    console.log(req.body);

    // const question = req.body;
    // console.log("question");
    // console.log(question);

    const qBody = req.body.qBody;
    const choices = req.body.choices;

    console.log("qBody");
    console.log(qBody);
    console.log("choices");
    console.log(choices);

    let question_id = -1;

    const questionQuery = `INSERT INTO ${qTable}(body) VALUES('${qBody}');`;
    let choicesQuery = `INSERT INTO ${cTable}(question_id, is_answer, input_text) VALUES`;

    const results = await query(questionQuery);
    // if (err) throw err;
    console.log("successfully executed questions query");

    console.log("results.insertId:");
    console.log(results.insertId);

    // get latest question id
    question_id = results.insertId;

    try {
      if (question_id < 1) throw new Error("retrieved question_id is < 1");
    } catch (err) {
      console.log(err);
      res.statusCode = statusServerError;
      res.end(err);
    }

    // append values to choicesQuery string
    for (let i = 0; i < choices.length; i++) {
      // isAnswer convention:
      // 0 === true
      // 1 === false
      choicesQuery += `(${question_id}, ${choices[i].isAnswer ? 0 : 1}, '${
        choices[i].text
      }')${i === choices.length - 1 ? ";" : ","}`;
    }

    console.log("choicesQuery:");
    console.log(choicesQuery);

    try {
      // execute query for choices table
      await query(choicesQuery);
    } catch (err) {
      console.log(err);
      res.statusCode = statusServerError;
      res.end(err);
    }

    console.log("successfully executed choices query");

    console.log("finished all queries in POST method");
    res.statusCode = statusOkay;
    // send back Question object with question id
    const createdQuestion = {
      qBody: qBody,
      choices: choices,
      questionId: question_id
    };

    res.json(createdQuestion);
    // res.end("Successfully added to database");
  })();
});

app.put("/questions", function (req, res) {
  (async () => {
    console.log("inside app.js PUT method");

    console.log("req.body");
    console.log(req.body);

    // represents whether or not the Question has been updated
    // used for res.end()
    let updated = false;

    // holds the Question object passed in from request
    const questionToUpdate = req.body;

    // get question and respective data to compare

    const getQuestionQuery = `SELECT * FROM questions WHERE question_id=${questionToUpdate.questionId}`;
    const getChoicesQuery = `SELECT * FROM choices WHERE question_id=${questionToUpdate.questionId}`;

    let dbQuestion = {};
    let dbChoices = {};

    try {
      dbQuestion = await query(getQuestionQuery);
      dbChoices = await query(getChoicesQuery);
    } catch (err) {
      console.log(err);
      res.statusCode = statusServerError;
      res.end(err);
    }

    console.log("dbQuestion:");
    console.log(dbQuestion);
    console.log("dbChoices:");
    console.log(dbChoices);

    // create new Question object to match req.body
    const originalQuestion = {
      qBody: dbQuestion[0].body,
      choices: dbChoices.map((choice) => {
        return {
          choiceId: choice.choice_id,
          isAnswer: choice.is_answer === 0 ? true : false,
          text: choice.input_text,
        };
      }),
      questionId: dbQuestion[0].question_id,
    };

    console.log("originalQuestion:");
    console.log(originalQuestion);

    // values to compare:
    // 1. body
    // 2. is_answer
    // 3. input_text

    console.log("questionToUpdate.questionId: " + questionToUpdate.questionId);
    console.log("originalQuestion.question_id: " + originalQuestion.questionId);

    try {
      if (questionToUpdate.questionId !== originalQuestion.questionId)
        throw new Error(
          "Question ID mismatch between sent Question object and Question from database."
        );
    } catch (err) {
      console.log(err);
      res.statusCode = statusBadRequest;
      res.end(err);
    }

    // compare body
    if (questionToUpdate.qBody !== originalQuestion.qBody) {
      console.log("qBody mismatch; executing update questions query");
      const updateQuestionQuery = `UPDATE questions SET body='${questionToUpdate.qBody}' WHERE question_id = ${originalQuestion.questionId};`;
      console.log("updateQuestionQuery:");
      console.log(updateQuestionQuery);

      try {
        await query(updateQuestionQuery);
      } catch (err) {
        console.log(err);
        res.statusCode = statusServerError;
        res.end(err);
      }

      updated = true;
    }

    const updatedChoices = questionToUpdate.choices;
    const originalChoices = originalQuestion.choices;

    // compare choice isAnswer and inputText
    for (let i = 0; i < originalQuestion.choices.length; i++) {
      let updateChoicesQuery = "UPDATE choices SET ";
      let hasUpdate = false;

      if (updatedChoices[i].isAnswer !== originalChoices[i].isAnswer) {
        console.log(
          "isAnswer mismatch; appending set query for update choices"
        );
        // isAnswer value convention:
        // 0 == true
        // 1 == false
        updateChoicesQuery += `is_answer=${updatedChoices[i].isAnswer ? 0 : 1}`;
        hasUpdate = true;
      }

      if (updatedChoices[i].text !== originalChoices[i].text) {
        console.log("text mismatch; appending set query for update choices");
        // if isAnswer was also updated,
        // append a comma before doing anything else
        if (hasUpdate) updateChoicesQuery += ", ";

        updateChoicesQuery += `input_text='${updatedChoices[i].text}'`;
        hasUpdate = true;
      }

      updateChoicesQuery += ` WHERE choice_id=${originalChoices[i].choiceId};`;
      console.log("updateChoicesQuery(final):");
      console.log(updateChoicesQuery);

      // if there are changes detected in in the Question
      // execute update query
      if (hasUpdate) {
        try {
          await query(updateChoicesQuery);
        } catch (err) {
          console.log(err);
          res.statusCode = statusServerError;
          res.end(err);
        }
        updated = true;
      }
    }

    console.log("end of PUT method");
    res.statusCode = statusOkay;
    res.end(updated ? updateSuccessful : noUpdatesFound);
  })();
});

http
  .createServer(app)
  .listen(port, () => console.log(`App listening at port: ${port}`));
