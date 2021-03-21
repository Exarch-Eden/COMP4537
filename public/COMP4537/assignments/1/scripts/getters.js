// element id and class identifications

const questionForm = (questionNum) => {
  return `question${questionNum}Form`;
};

const questionBodyInput = (questionNum) => {
  return `question${questionNum}BodyInput`;
};

const questionChoiceContainer = (questionNum, choiceIndex) => {
  return `question${questionNum}ChoiceContainer${choiceIndex}`;
};
const questionChoiceRadio = (questionNum, choiceIndex) => {
  return `question${questionNum}ChoiceRadio${choiceIndex}`;
};
const questionChoiceInput = (questionNum, choiceIndex) => {
  return `question${questionNum}ChoiceInput${choiceIndex}`;
};

const questionChoiceRemoveButton = (questionNum, choiceIndex) => {
  return `question${questionNum}removeChoiceButton${choiceIndex}`;
};

const questionUpdateButton = (questionNum) => {
  return `question${questionNum}updateButton`;
};
