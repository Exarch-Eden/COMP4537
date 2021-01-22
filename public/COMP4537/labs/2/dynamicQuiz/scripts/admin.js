const message_localStorageNotSupported =
  "Web browser does not support local storage.";

// id names and templates
const id_divAllQuestions = "div_allQuestions";

const id_form = "form";

const id_inputQuestionText = "input_qBody";
const id_inputRadio = "input_radio";
const id_inputAnswerText = "input_a";

const id_buttonAdd = "button_add";
const id_buttonDelete = "button_delete";
const id_buttonCreate = "button_create";

// class names
const class_divQuestion = "div_question";
const class_divQuestionText = "div_questionText";
const class_divAnswer = "div_answer";
const class_divButtons = "div_buttons";

const class_inputQuestionText = "input_questionText";
const class_inputAnswerText = "input_answerText";
const class_inputRadio = "input_radio";

// button add value
const text_buttonAdd = "Add";
// button delete value
const text_buttonDelete = "Delete";

function createQuestion() {
  // main container for all questions
  const div_allQuestions = document.getElementById(id_divAllQuestions);

  // hide create button
  document.getElementById(id_buttonCreate).hidden = true;

  console.log("id: " + div_allQuestions.id);

  const div_question = createQuestionDiv();

  // add current question div to the main div (that holds all questions)
  addElem(div_allQuestions, div_question);

  addElem(div_question, createQuestionForm());

  addElem(div_question, createQuestionButtons());
}

function createQuestionDiv() {
  // holds the entirety of the text fields and radio buttons
  const div_question = document.createElement("div");

  // set the class names to the respective elements (style in admin.css)
  div_question.className = class_divQuestion;

  console.log("className: " + div_question.className);

  return div_question;
}

function createQuestionForm() {
  // form for the input fields
  const form = document.createElement("form");
  // the input for the question text
  const input_questionText = document.createElement("input");

  console.log(localStorage);

  console.log("lslength: " + localStorage.length);
  form.id = id_form + (localStorage.length + 1);
  console.log("form id: " + form.id);

  input_questionText.className = class_inputQuestionText;
  input_questionText.id = id_inputQuestionText;
  input_questionText.form = form.id;

  input_questionText.setAttribute("value", "Input question text here.");

  addElem(form, input_questionText);

  // add fields for the multiple-choice answers
  for (let i = 1; i <= 4; ++i) {
    // holds the current answer field
    const div_answer = document.createElement("div");
    // input for right answer selection
    const input_radio = document.createElement("input");
    // input for current answer field text
    const input_answerText = document.createElement("input");

    div_answer.className = class_divAnswer;
    input_radio.className = class_inputRadio;
    input_answerText.className = class_inputAnswerText;

    input_radio.id = id_inputRadio + i;
    input_answerText.id = id_inputAnswerText + i;

    input_radio.form = form.id;
    input_answerText.form = form.id;

    console.log(input_radio.id);
    console.log(input_answerText.id);

    input_radio.setAttribute("type", "radio");

    addElem(div_answer, input_radio);
    addElem(div_answer, input_answerText);
    addElem(form, div_answer);
  }

  return form;
}

function createQuestionButtons() {
  const div_buttons = document.createElement("div");
  // the Add button
  const button_add = document.createElement("button");
  // the Delete button
  const button_delete = document.createElement("button");

  div_buttons.className = class_divButtons;
  button_add.id = id_buttonAdd;
  button_delete.id = id_buttonDelete;

  // set button types
  button_add.setAttribute("type", "submit");
  button_delete.setAttribute("type", "button");
  // set button onclick
  button_add.setAttribute("onclick", "addQuestion()");
  button_delete.setAttribute("onclick", "deleteQuestion()");

  button_add.textContent = text_buttonAdd;
  button_delete.textContent = text_buttonDelete;

  addElem(div_buttons, button_add);
  addElem(div_buttons, button_delete);

  return div_buttons;
}

// function Question(qText, answers) {
//   this.qText = qText;
//   this.answers = answers;
// }

function Question(qBody, aChoices) {
  this.qBody = qBody;
  this.aChoices = aChoices;
}

// add new question to localStorage
function addQuestion() {
  const qBody = document.getElementById("input_qBody").value;

  let index = 1;
  const aChoices = {
    a1: {
      label: getValue(id_inputAnswerText + index),
      isAnswer: isChecked(id_inputRadio + index++),
    },
    a2: {
      label: getValue(id_inputAnswerText + index),
      isAnswer: isChecked(id_inputRadio + index++),
    },
    a3: {
      label: getValue(id_inputAnswerText + index),
      isAnswer: isChecked(id_inputRadio + index++),
    },
    a4: {
      label: getValue(id_inputAnswerText + index),
      isAnswer: isChecked(id_inputRadio + index++),
    },
  };

  console.log(aChoices);

  let question = new Question(qBody, aChoices);
  console.log(question);

  // const numQuestions = localStorage.length;
  // localStorage.setItem("question" + numQuestions, question);
}

function deleteQuestion() {
  // remove from localStorage
}

function backToIndex() {
  window.location.href =
    "http://127.0.0.1:5500/public/COMP4537/labs/2/dynamicQuiz/index.html";
}

function checkLocalStorageSupport() {
  // if browser does not support webStorage
  if (typeof Storage == "undefined") {
    alert(message_localStorageNotSupported);
    window.stop(); // prevent further consumption of resources
  }
}

function getLocalStorage() {
  if (localStorage.length === 0) {
    return;
  }

  // display items from localStorage
  for (let i = 0; i < localStorage.length; ++i) {

  }
}

// HELPER METHODS

function addElem(parent_elem, child_elem) {
  parent_elem.appendChild(child_elem);
}

function getValue(elem_id) {
  return document.getElementById(elem_id).value;
}

function isChecked(radio_id) {
  return document.getElementById(radio_id).checked;
}

// EXECUTED FUNCTIONS
checkLocalStorageSupport();
