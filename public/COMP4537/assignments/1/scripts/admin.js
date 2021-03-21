// holds the number of questions currently rendered within the page
let questionNum = -1;

// minimum of 2 choices and maximum of 4
const MIN_CHOICES = 2;
const MAX_CHOICES = 4;

// the number of choices within the new question form
let numNewChoices = 2;

// specifically for new questions form
const newQuestionFormId = "newQuestionForm";
const newQuestionBodyId = "newQuestionBody";

// requires specific number between 2 and 4 appended to the string
const newQuestionChoiceContainerId = "newQuestionChoiceContainer";
const newQuestionChoiceRadioId = "newQuestionChoiceRadio";
const newQuestionChoiceInputId = "newquestionChoiceInput";
const newQuestionChoiceRemoveId = "removeChoiceButton";

// new question radio group name
const newQuestionRadioName = "newQuestionRadio";

// button ids from new question form
const addChoiceButtonId = "addChoiceButton";

// string constants
const UPDATE_SUCCESSFUL = "Update successful";
const NO_UPDATES_FOUND = "No updates found";
const EMPTY_FIELD = "One or more fields are empty";
const NO_RADIOS_CHECKED = "No choices have been set as the correct answer";

// remove an element from its parent
const deleteElem = (elem) => {
  elem.parentNode.removeChild(elem);
  console.log("child removed");
};

// get the value of an input element
const getInputValue = (elemId) => {
  console.log("getInputValue: " + document.getElementById(elemId).value);
  return document.getElementById(elemId).value;
};

// onclick function for adding choices to new question
const addChoice = () => {
  // do not allow addition of choice if num choices > 4
  if (numNewChoices === 4) {
    alert("No more than four choices are allowed per question.");
    return;
  }

  // increment numNewChoices
  numNewChoices += 1;

  const newQuestionForm = document.getElementById(newQuestionFormId);

  // elements related to question choices
  const questionChoiceContainer = document.createElement(DIV);
  const questionChoiceRadio = document.createElement(INPUT);
  const questionChoiceInput = document.createElement(INPUT);
  const questionChoiceRemove = document.createElement(BUTTON);

  // set the ids
  questionChoiceContainer.id =
    newQuestionChoiceContainerId + numNewChoices.toString();
  questionChoiceRadio.id = newQuestionChoiceRadioId + numNewChoices.toString();
  questionChoiceInput.id = newQuestionChoiceInputId + numNewChoices.toString();
  questionChoiceRemove.id =
    newQuestionChoiceRemoveId + numNewChoices.toString();

  // set the class
  questionChoiceRadio.className = questionRadioClass;
  questionChoiceInput.className = questionInputClass;

  // set the type to radio for radio input
  questionChoiceRadio.type = "radio";

  // set remove button text
  questionChoiceRemove.innerText = "-";

  // set onclick functionality for removeChoiceButton
  questionChoiceRemove.onclick = () => {
    removeChoice();
  };

  // set the form attributes of input elements
  questionChoiceRadio.form = newQuestionFormId;
  questionChoiceInput.form = newQuestionFormId;

  // set the radio name attribute of radio elements
  questionChoiceRadio.setAttribute("name", newQuestionRadioName);

  const previousChoiceContainer = document.getElementById(
    newQuestionChoiceContainerId + (numNewChoices - 1).toString()
  );

  // add the elements to their respective parent elements
  addElem(previousChoiceContainer, questionChoiceContainer, true);
  addElem(questionChoiceContainer, questionChoiceRadio);
  addElem(questionChoiceContainer, questionChoiceInput);
  addElem(questionChoiceContainer, questionChoiceRemove);

  // DEPRECATED
  // if numNewChoices now equals four
  // hide addChoice button
  // if (numNewChoices === 4) {
  //   document.getElementById(addChoiceButtonId).hidden = true;
  //   console.log("addChoiceButton is now hidden");
  // }
};

const removeChoice = () => {
  if (numNewChoices === 2) {
    alert("No less than two choices are allowed per question.");
    return;
  }

  console.log("removing choice:");
  console.log(newQuestionChoiceContainerId + numNewChoices.toString());

  // remove the child element container from the parent
  deleteElem(
    document.getElementById(
      newQuestionChoiceContainerId + numNewChoices.toString()
    )
  );

  numNewChoices -= 1;

  // DEPRECATED
  // show addChoice button when number of choice goes down from 4 (max)
  // if (numNewChoices === 3) {
  //   document.getElementById(addChoiceButtonId).hidden = false;
  //   console.log("addChoiceButton is no longer hidden");
  // }
};

const checkEmptyString = (strToTrim) => {
  // return true if string is not empty
  // false if it is
  return strToTrim.trim().length !== 0;
};

// renders a new question object and its form to the questions container
const addNewQuestion = () => {
  // get body input value
  const qBody = getInputValue(newQuestionBodyId);

  if (!checkEmptyString(qBody)) {
    alert(EMPTY_FIELD);
    return;
  }

  // object to hold the choice values
  const choices = [];

  // represents whether or not all radios are checked
  // if true, show alert
  let radiosChecked = false;

  // get choice values
  for (let i = 1; i <= numNewChoices; i++) {
    const isChecked = document.getElementById(
      newQuestionChoiceRadioId + i.toString()
    ).checked;
    const choiceInput = document.getElementById(
      newQuestionChoiceInputId + i.toString()
    ).value;

    if (!checkEmptyString(choiceInput)) {
      alert(EMPTY_FIELD);
      return;
    }

    if (isChecked) radiosChecked = true;

    choices[i - 1] = { isAnswer: isChecked, text: choiceInput };
    console.log("choices[i - 1]:");
    console.log(choices[i - 1]);
  }

  if (!radiosChecked) {
    alert(NO_RADIOS_CHECKED);
    return;
  }

  console.log("choices:");
  console.log(choices);

  // store input values into Question object
  const question = new Question(qBody, choices);

  console.log("question:");
  console.log(question);

  console.log("writing data");

  // clear input
  document.getElementById(newQuestionBodyId).value = "";
  for (let i = 1; i <= numNewChoices; i++) {
    document.getElementById(
      newQuestionChoiceRadioId + i.toString()
    ).checked = false;

    document.getElementById(
      newQuestionChoiceInputId + i.toString()
    ).value = "";

    // remove choices if number of choices are greater than the minimum amount
    if (i > 2) {
      removeChoice();
    }
  }

  // insert to database
  writeData(question);
};

const writeData = (question) => {
  const xhttp = new XMLHttpRequest();

  const url = "http://localhost:8000/questions";

  xhttp.open("POST", url, true);

  xhttp.setRequestHeader("Content-Type", "application/json");

  console.log("JSON.stringify()");
  console.log(JSON.stringify(question));

  xhttp.send(JSON.stringify(question));

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      console.log("finished writing data");

      const response = JSON.parse(xhttp.responseText);
      console.log("xhttp.responseText:");
      console.log(response);

      // create new Question object that contains the question id from the database
      const newQuestion = new Question(response.qBody, response.choices);

      renderNewQuestion(newQuestion, response.questionId);
    } else {
      console.log("not finished");
    }
  };
};

const updateData = (question) => {
  const xhttp = new XMLHttpRequest();

  const url = "http://localhost:8000/questions";

  xhttp.open("PUT", url, true);

  xhttp.setRequestHeader("Content-Type", "application/json");

  console.log("JSON.stringify()");
  console.log(JSON.stringify(question));

  xhttp.send(JSON.stringify(question));

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      console.log("finished updating data");
      console.log(xhttp.responseText);
      // if an update was successfully executed, alert the user
      if (xhttp.responseText === UPDATE_SUCCESSFUL) alert(UPDATE_SUCCESSFUL);
    } else {
      console.log("not finished");
    }
  };
};
