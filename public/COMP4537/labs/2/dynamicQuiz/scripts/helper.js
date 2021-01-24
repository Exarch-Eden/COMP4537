const message_localStorageNotSupported =
  "Web browser does not support local storage.";

// HELPER METHODS

function addElem(parent_elem, child_elem) {
  parent_elem.appendChild(child_elem);
}

function deleteElem(elem) {
  elem.parentNode.removeChild(elem);
}

function getValue(elem_id) {
  return document.getElementById(elem_id).value;
}

function isChecked(radio_id) {
  return document.getElementById(radio_id).checked;
}

function toggleCreateButton() {
  document.getElementById(id_buttonCreate).hidden = !document.getElementById(
    id_buttonCreate
  ).hidden;
}

function backToIndex() {
  window.location.href = indexUrl;
}

function isAdminPage() {
  return window.location.href === adminUrl ? true : false;
}

function numDefined(num) {
  return num !== undefined ? true : false;
}

function checkLocalStorageSupport() {
  // if browser does not support webStorage
  if (typeof Storage == "undefined") {
    alert(message_localStorageNotSupported);
    window.stop(); // prevent further consumption of resources
  }
}

function setLocalStorage(key, question) {
  localStorage.setItem(key, JSON.stringify(question));
}

function getLocalStorage() {
  if (localStorage.length === 0) {
    console.log("No items in localStorage");
    return;
  }

  displayQuestions();
}

function displayQuestions() {
  // display items from localStorage
  for (let i = 1; i <= localStorage.length; ++i) {
    console.log("i: " + i);
    createQuestion(i);
  }
}
