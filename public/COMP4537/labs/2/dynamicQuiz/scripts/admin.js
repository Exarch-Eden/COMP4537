// // id names and templates
// const id_divAllQuestions = "div_allQuestions";

// const id_divQuestion = "div_q";

// const id_form = "form";

// const id_inputQuestionText = "input_qBody";
// const id_inputRadio = "input_radio";
// const id_inputAnswerText = "input_a";

// const id_buttonAdd = "button_add";
// const id_buttonDelete = "button_delete";
// const id_buttonCreate = "button_create";

// // class names
// const class_divQuestion = "div_question";
// const class_divQuestionText = "div_questionText";
// const class_divAnswer = "div_answer";
// const class_divButtons = "div_buttons";

// const class_inputQuestionText = "input_questionText";
// const class_inputAnswerText = "input_answerText";
// const class_inputRadio = "input_radio";

// // button add value
// const text_buttonAdd = "Add";
// // button delete value
// const text_buttonDelete = "Delete";

let globalLength = localStorage.length;

function Question(qBody, aChoices) {
  this.qBody = qBody;
  this.aChoices = aChoices;
}

// add new question to localStorage
function addQuestion() {
  const qBody = getValue(id_inputQuestionText);

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

  let questionObj = new Question(qBody, aChoices);
  console.log(questionObj);

  // remove parent element
  deleteElem(document.getElementById(id_divQuestion));

  // reveal create question button after
  toggleCreateButton();

  // add to localStorage
  const questionNum = localStorage.length + 1;

  // push question object to local storage
  setLocalStorage("question" + questionNum, questionObj)

  // localStorage.setItem("question" + questionNum, question);

  console.log(localStorage);
}

function deleteQuestion() {
  

  // remove last item from localStorage
  const lastItemKey = "question" + localStorage.length;
  localStorage.removeItem(lastItemKey);
}

// EXECUTED FUNCTIONS
checkLocalStorageSupport();

getLocalStorage();


// window.localStorage.clear();