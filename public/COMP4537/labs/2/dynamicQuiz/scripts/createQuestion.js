function createQuestion(questionNum) {
  // main container for all questions
  const div_allQuestions = document.getElementById(id_divAllQuestions);

  console.log("id: " + div_allQuestions.id);

  // holds the current question and its elements
  const div_question = createQuestionDiv();

  // add current question div to the main div (that holds all questions)
  addElem(div_allQuestions, div_question);

  console.log("questionNum: " + questionNum);

  // if parameter arg is passed, change function signature
  // to generate read-only form
  const form_question = !numDefined(questionNum)
    ? createQuestionForm()
    : createQuestionForm(questionNum);

  // add form to the current question div
  addElem(div_question, form_question);

  if (isAdminPage()) {
    if (!numDefined(questionNum)) {
      // hide create button
      document.getElementById(id_buttonCreate).hidden = true;
    }

    const div_buttons = createQuestionButtons();

    // const div_buttons = !numDefined(questionNum)
    //   ? createQuestionButtons()
    //   : createQuestionButtons(questionNum);

    // add buttons to div
    addElem(div_question, div_buttons);
  }
}

function createQuestionDiv() {
  // holds the entirety of the text fields and radio buttons
  const div_question = document.createElement("div");

  // set the id and class names to the respective elements
  div_question.className = class_divQuestion;
  div_question.id = id_divQuestion;

  console.log("className: " + div_question.className);

  return div_question;
}

function createQuestionForm(questionNum) {
  // form for the input fields
  const form = document.createElement("form");
  // the input for the question text
  const input_questionText = document.createElement("input");
  // Question object from localStorage
  // set to null if parameter arg is undefined
  // extract localStorage Question object otherwise
  const questionObj = !numDefined(questionNum)
    ? null
    : JSON.parse(localStorage.getItem("question" + questionNum));

  // LOGS FOR TESTING PURPOSES (remove later)
  console.log(localStorage);
  console.log("lslength: " + localStorage.length);

  console.log("questionNum: " + questionNum);
  console.log("Question Obj:");
  console.log(questionObj);
  // console.log(questionObj.qBody);

  const formId = !numDefined(questionNum)
    ? id_form + (localStorage.length + 1)
    : id_form + questionNum;

  form.id = formId;

  console.log("form id: " + form.id);

  input_questionText.className = class_inputQuestionText;
  input_questionText.id = id_inputQuestionText;
  input_questionText.form = form.id;

  if (numDefined(questionNum)) {
    // if question is from localStorage
    input_questionText.setAttribute("value", questionObj.qBody);

    input_questionText.readOnly = true;
  } else {
    // new question text value
    input_questionText.setAttribute("value", "Input question text here.");
  }

  // add question text body to form
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

    // if parameter arg is defined, set input labels as read-only
    // and link them as labels to the radio
    if (numDefined(questionNum)) {
      const answerId = "a" + i;
      input_answerText.setAttribute(
        "value",
        questionObj.aChoices[answerId].label
      );
      input_answerText.readOnly = true;
      // if in admin page only, reveal answer(s)
      if (isAdminPage() && questionObj.aChoices[answerId].isAnswer === true) {
        input_radio.checked = true;
      }
    }

    input_radio.setAttribute("type", "radio");

    addElem(div_answer, input_radio);
    addElem(div_answer, input_answerText);
    addElem(form, div_answer);
  }

  return form;
}

function createQuestionButtons(questionNum) {
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

  // if (!numDefined(questionNum)) {
    addElem(div_buttons, button_add);
  // }

  addElem(div_buttons, button_delete);

  return div_buttons;
}
