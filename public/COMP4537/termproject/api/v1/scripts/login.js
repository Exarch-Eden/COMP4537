// id constants
const loginContainerId = "loginContainer";
const emailInputId = "emailInput";
const passwordInputId = "passwordInput";
const loginButtonId = "loginButton";

window.onload = () => {
  const loginButton = document.getElementById(loginButtonId);

  loginButton.addEventListener("click", () => {
    verifyLogin();
  });
};

const goToAdmin = () => {
  window.location.href = "./admin.html";
};

const verifyLogin = () => {
  const emailInputValue = document.getElementById(emailInputId).value.trim();
  const passwordInputValue = document
    .getElementById(passwordInputId)
    .value.trim();

  // validate empty
  if (emailInputValue.length === 0 || passwordInputValue.length === 0) {
    alert("Please fill in all the fields");
    return;
  }

  // data to be parsed and sent to server for verification
  const loginData = {
    email: emailInputValue,
    password: passwordInputValue,
  };

  console.log("loginData: \n", loginData);

  postUserLogin(loginData);
};

const postUserLogin = async (loginData) => {
  // query parameters
  const emailQuery = `?email=${loginData.email}`;
  const passwordQuery = `&password=${loginData.password}`;

  const url =
    crossOriginPrefix +
    baseAPILink +
    apiUserAdmin +
    "/" +
    apiLogin +
    emailQuery +
    passwordQuery;
  console.log(`link: \n${url}`);

  console.log("sending POST request");
  await makeRequest(POST, url).catch((error) => {
    console.log("makeRequest error: \n", error);
    alert("Invalid email or password");
    return;
  });
  console.log("server responded");

  goToAdmin();
};
