// api key
const apiKey = "2621c1e4-6c9a-4d96-b9f6-8d734c115da2";

// the base link for API calls
const baseAPILink = "https://billyvunguyen.com/AnimeAway/v1/";

// link suffixes for API related calls
const apiUriStatus = "uri_status";

// id constants
const uriStatusContainerId = "uriStatusContainer";

// DOM create element tag constants
const CREATE_UL = "ul";
const CREATE_LI = "li";

// http method constants
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

// the maximum possible number of URIs
const MAX_URIS = 10;

window.onload = () => {
  renderUri();
};

const renderUri = () => {
  // container for the uri unordered list
  const uriContainer = document.getElementById(uriStatusContainerId);

  // list to hold the data extracted from URI table in database
  const uriList = document.createElement(CREATE_UL);

  // execute GET method to grab the URI statuses from database
  const uriData = getUri();

  // put data into unordered list
  for (let i = 0; i < MAX_URIS; i++) {
    const currentUri = document.createElement(CREATE_LI);
    currentUri.innerText = `item ${i + 1}`;
    uriList.appendChild(currentUri);
  }

  uriContainer.appendChild(uriList);
}

const getUri = () => {
  const uriData = {};

  const xhttp = new XMLHttpRequest();

  const url = baseAPILink + apiUriStatus + `?api_key=${apiKey}`;
  console.log(`link: ${url}`);

  xhttp.open(GET, url, true);

  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.send();

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      console.log("finished reading data");

      console.log(`responseText: \n${xhttp.responseText}`);
    } else {
      console.log("not finished reading data");
    }
  }

  console.log("end of getUri()");

  return uriData;
}