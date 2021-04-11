// api key
const apiKey = "2621c1e4-6c9a-4d96-b9f6-8d734c115da2";

// CORS proxy link
const crossOriginPrefix = "https://limitless-depths-77398.herokuapp.com/";

// the base link for API calls
const baseAPILink = "https://billyvunguyen.com/AnimeAway/v1/";

// link suffixes for API related calls
const apiUriStatus = "uri_status";
const apiQuotes = "quote";
const apiMangaComic = "manga_comic";
const apiAnimeCartoon = "anime_cartoon";
const apiUserAdmin = "user_admin";
const apiLogin = "login";

// status code constants
const STATUS_200 = 200;
const STATUS_201 = 201;

// DOM create element tag constants
const CREATE_DIV = "div";
const CREATE_P = "p";
const CREATE_BUTTON = "button";

const CREATE_UL = "ul";
const CREATE_LI = "li";
const CREATE_TABLE = "table";
const CREATE_TR = "tr"; // table row
const CREATE_TH = "th"; // table header
const CREATE_TD = "td"; // table data

// http method constants
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

/**
 * Make an API request to the server.
 *
 * @param {*} method the http method to execute
 * @param {*} url the url to make an API request to
 * @returns a promise that resolves with database data
 */
const makeRequest = (method, url) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open(method, url, true);

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Authorization", `Bearer ${apiKey}`);

    xhttp.onload = () => {
      const status = xhttp.status;

      console.log(`status: ${status}`);
      if (status === STATUS_200 || status === STATUS_201) {
        try {
          const responseText = xhttp.responseText;
          console.log("xhttp Response Text:\n", responseText);

          resolve(responseText.length > 0 ? JSON.parse(responseText) : status);
        } catch (error) {
          console.log("Error resolving responseText:\n", error);
        }
        resolve(status);
      } else {
        console.log("An error occured while attempting to read data");
        reject(status);
      }
    };

    xhttp.send();

    // OLD CODE --------------------------------------------
    // xhttp.onreadystatechange = () => {
    //   // try {
    //   //   // while not ready and status is not OK (200)
    //   //   while (!(xhttp.readyState === 4 && xhttp.status === STATUS_200)) {
    //   //     console.log("not finished reading data");
    //   //   }

    //   //   console.log("await");

    //   if (xhttp.readyState === 4 && xhttp.status === 200) {
    //     console.log("finished reading data");

    //     console.log(`responseText: \n${xhttp.responseText}`);
    //   } else {
    //     console.log("not finished reading data");
    //   }
    //   // } catch (err) {
    //   //   console.log("An error occured while attempting to read data");
    //   //   console.log(err);
    //   // }
    // };
  });
};

const backToIndex = () => {
  //   window.location.href = `${assignmentRootDirectory}index.html`;
  // window.location.href = "./index.html";
  window.location.href = "./anime.html";
};
