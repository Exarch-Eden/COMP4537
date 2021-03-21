// unique id for container that holds all rendered questions
const questionsContainerId = "questionsContainer";

// class identifiers
const questionRadioClass = "questionRadio";
const questionInputClass = "questionInput";

// element tags
const DIV = "div";
const FORM = "form";
const INPUT = "input";
const BUTTON = "button";

// @param qBody string of text for the question body
// @param choices array of objects, each with two properties
// (isAnswer: boolean and text: string)
function Question(qBody, choices, questionId = null) {
  this.qBody = qBody;
  this.choices = choices;
  this.questionId = questionId;
}

// appends a child element to a specified parent
// @param parent the parent element to append to
// @param child the child element to be appended
// @param isSibling boolean to check if parent element should be treated
// as a sibling
const addElem = (parent, child, isSibling) => {
  // insert right after an element as a sibling
  if (isSibling) {
    parent.parentNode.insertBefore(child, parent.nextSibling);
    console.log("inserted after specific sibling");
    return;
  }

  parent.appendChild(child);
  console.log("child appended");
};

// renders a new form element to insert question information
// @param question the Question object to take values from
// @param questionNum the question number (for setting element ids)
const renderNewQuestion = (question, questionNum, isStudent) => {
  // error checking
  if (questionNum < 1)
    throw new Error("Index passed into renderNewForm() is < 1");

  // DEPRECATED
  // set global index variable to index parameter
  // questionNum = index;

  // main container for all rendered questions
  const questionsContainer = document.getElementById(questionsContainerId);

  // the elements to be rendered for the question
  const singleForm = document.createElement(FORM);
  const questionBody = document.createElement(INPUT);

  // set ids
  singleForm.id = questionForm(questionNum);
  questionBody.id = questionBodyInput(questionNum);

  // set the value of the question body input
  questionBody.value = question.qBody;

  // if student page is rendering the question
  // change input to read-only
  if (isStudent) questionBody.readOnly = true;

  // add question body input to the form
  addElem(singleForm, questionBody);

  // render question choices
  for (
    let choiceIndex = 0;
    choiceIndex < question.choices.length;
    choiceIndex++
  ) {
    const qChoiceContainer = document.createElement(DIV);
    const qChoiceRadio = document.createElement(INPUT);
    const qChoiceInput = document.createElement(INPUT);
    // const removeChoiceButton = document.createElement(BUTTON);

    // set ids
    qChoiceContainer.id = questionChoiceContainer(questionNum, choiceIndex);
    qChoiceRadio.id = questionChoiceRadio(questionNum, choiceIndex);
    qChoiceInput.id = questionChoiceInput(questionNum, choiceIndex);
    // removeChoiceButton.id = questionChoiceRemoveButton(index, i);

    // set the form attribute of inputs
    qChoiceRadio.form = singleForm.id;
    qChoiceInput.form = singleForm.id;

    // set the type of the radio input
    qChoiceRadio.type = "radio";

    // set the name attribute of the radio input
    qChoiceRadio.setAttribute("name", questionForm(questionNum));

    // set the values of the input fields
    // if not student page, show correct answer
    if (!isStudent)
      qChoiceRadio.checked = question.choices[choiceIndex].isAnswer
        ? true
        : false;
    qChoiceInput.value = question.choices[choiceIndex].text;

    // if student page is rendering the question
    // change input to read-only
    if (isStudent) qChoiceInput.readOnly = true;

    // DEPRECATED as of 03:58 19th of March 2021
    // set the onclick function of the removeChoiceButton
    // removeChoiceButton.onclick = () => {
    //   deleteElem(questionChoiceContainer);
    // };

    // add elements to parent container
    addElem(qChoiceContainer, qChoiceRadio);
    addElem(qChoiceContainer, qChoiceInput);
    // addElem(questionChoiceContainer, removeChoiceButton);

    // add the question choice container to the form
    addElem(singleForm, qChoiceContainer);
  }

  // if not student page, render update button
  if (!isStudent) {
    const updateButton = document.createElement(BUTTON);
    updateButton.id = questionUpdateButton(questionNum);
    updateButton.innerText = "Update";
    updateButton.onclick = (e) => {
      e.preventDefault();
      console.log("updateButton clicked");

      // holds the input values
      const qBody = questionBody.value;
      const choices = [];

      for (
        let choiceIndex = 0;
        choiceIndex < question.choices.length;
        choiceIndex++
      ) {
        const choiceRadio = document.getElementById(questionChoiceRadio(questionNum, choiceIndex));
        const choiceInput = document.getElementById(questionChoiceInput(questionNum, choiceIndex));
        choices[choiceIndex] = {
          isAnswer: choiceRadio.checked,
          text: choiceInput.value,
        };
      }

      // the Question object to send with PUT method
      const questionToUpdate = new Question(qBody, choices, questionNum);
      console.log("question to update:");
      console.log(questionToUpdate);

      updateData(questionToUpdate);
    };
    addElem(singleForm, updateButton);
  }

  // add the form to the questions container
  addElem(questionsContainer, singleForm);
};

const readData = () => {
  const xhttp = new XMLHttpRequest();

  // local
  const localUrl = "http://localhost:8000/questions";
  // heroku
  const herokuUrl = "https://kentc.herokuapp.com/questions"; 

  const url = herokuUrl;

  const studentUrl =
    "https://kentc.herokuapp.com/COMP4537/assignments/1/student.html";

  const isStudent = window.location.href === studentUrl ? true : false;

  xhttp.open("GET", url, true);

  xhttp.setRequestHeader("Content-Type", "application/json");

  // console.log("JSON.stringify()");
  // console.log(JSON.stringify(question));

  xhttp.send();

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      console.log("finished reading data");

      console.log("responseText:");
      console.log(xhttp.responseText);

      const responseText = JSON.parse(xhttp.responseText);

      for (let i = 0; i < responseText.length; i++) {
        console.log("qBody:");
        console.log(responseText[i].qBody);
        console.log("choices:");
        console.log(responseText[i].choices);

        // create new Question object
        const curQuestion = new Question(
          responseText[i].qBody,
          responseText[i].choices
        );

        renderNewQuestion(curQuestion, responseText[i].id, isStudent);
      }
    } else {
      console.log("not finished");
    }
  };
};

window.onload = () => {
  readData();
};
