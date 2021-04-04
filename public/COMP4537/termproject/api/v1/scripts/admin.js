// api key
const apiKey = "2621c1e4-6c9a-4d96-b9f6-8d734c115da2";

// CORS proxy link
const crossOriginPrefix = "https://limitless-depths-77398.herokuapp.com/";

// the base link for API calls
const baseAPILink = "https://billyvunguyen.com/AnimeAway/v1/";

// link suffixes for API related calls
const apiUriStatus = "uri_status";

// id constants
const uriStatusContainerId = "uriStatusContainer";

// DOM create element tag constants
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

// status code constants
const STATUS_200 = 200;

// the maximum possible number of URIs
const MAX_URIS = 10;
// number of columns in a URI status
const NUM_COLUMNS_URI = 4;

window.onload = () => {
  renderUri();
};

const renderUri = () => {
  // container for the uri table
  const uriContainer = document.getElementById(uriStatusContainerId);

  // table to hold the data extracted from URI table in database
  const uriTable = document.createElement(CREATE_TABLE);

  // execute GET method to grab the URI statuses from database
  const uriData = getUri();

  const rowHeaders = document.createElement(CREATE_TR);

  // add the column headers of the table
  for (let i = 0; i < NUM_COLUMNS_URI; i++) {
    const curHeader = document.createElement(CREATE_TH);
    curHeader.innerText = getHeader(i);
    rowHeaders.appendChild(curHeader);
  }

  // append row of column headers to table
  uriTable.appendChild(rowHeaders);

  // put data into uri table
  uriData.map((curUri, index) => {
    const curRow = document.createElement(CREATE_TR);

    console.log(`curUri (index ${index}): \n${curUri}`);

    for (let j = 0; j < NUM_COLUMNS_URI; j++) {
      const curCol = document.createElement(CREATE_TD);

      switch (j) {
        case 0:
          curCol.innerText = curUri.stat_id;
          break;
        case 1:
          curCol.innerText = curUri.method;
          break;
        case 2:
          curCol.innerText = curUri.endpoint;
          break;
        case 3:
          curCol.innerText = curUri.requests;
          break;
      }

      curRow.appendChild(curCol);
    }

    // currentUri.innerText = `item ${i + 1}`;

    uriTable.appendChild(curRow);
  });

  // put data into uri table
  // for (let i = 1; i < uriData.length; i++) {}

  uriContainer.appendChild(uriTable);
};

const getHeader = (colNum) => {
  if (typeof colNum !== number)
    throw new Error("Parameter colNum is not of type number");
  if (colNum > 3 || colNum < 0)
    throw new Error("Parameter colNum value must be between 0-3");

  let headerName = "";
  switch (colNum) {
    case 0:
      headerName = "stat_id";
      break;
    case 1:
      headerName = "method";
      break;
    case 2:
      headerName = "endpoint";
      break;
    case 3:
      headerName = "requests";
      break;
  }

  return headerName;
};

const getUri = async () => {
  let uriData = [];

  const url =
    crossOriginPrefix + baseAPILink + apiUriStatus + `?api_key=${apiKey}`;
  console.log(`link: \n${url}`);

  console.log("awaiting uriData");
  uriData = await makeRequest(GET, url);

  console.log(`uriData: \n${uriData}`);

  console.log("end of getUri()");

  return uriData;
};

const makeRequest = (method, url) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open(method, url, true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onload = () => {
      const status = xhttp.status;
      console.log(`status: ${status}`);
      if (status === STATUS_200) {
        resolve(xhttp.responseText);
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
