// id constants
const uriStatusContainerId = "uriStatusContainer";

// the maximum possible number of URIs
const MAX_URIS = 10;
// number of columns in a URI status
const NUM_COLUMNS_URI = 4;

window.onload = async () => {
  await renderUri();
  // await getAnime();
  // await getManga();
};

/**
 * Renders the received URI status data.
 */
const renderUri = async () => {
  // container for the uri table
  const uriContainer = document.getElementById(uriStatusContainerId);

  // table to hold the data extracted from URI table in database
  const uriTable = document.createElement(CREATE_TABLE);

  // execute GET method to grab the URI statuses from database
  const uriData = await getUri();

  console.log("uriData in renderUri()");

  console.log(uriData);

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
  if (typeof colNum !== "number")
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

  const apiKeySuffix = `?api_key=${apiKey}`

  const url =
    crossOriginPrefix + baseAPILink + apiUriStatus;
  console.log(`link: \n${url}`);

  console.log("awaiting uriData");
  uriData = await makeRequest(GET, url);

  console.log(`uriData:`);
  console.log(uriData);

  console.log("end of getUri()");

  return uriData;
};

const getAnime = async () => {
  let animeData = [];

  const apiKeySuffix = `?api_key=${apiKey}`;
  const animeSuffix = `&anime_cartoon`;

  const url =
    crossOriginPrefix + baseAPILink + apiAnimeCartoon;
  console.log(`link: \n${url}`);

  console.log("awaiting animeData");
  animeData = await makeRequest(GET, url);

  console.log(`animeData:`);
  console.log(animeData);

  console.log("end of getAnime()");

  return animeData;
};

const getManga = async () => {
  let mangaData = [];

  const apiKeySuffix = `?api_key=${apiKey}`;
  const mangaSuffix = `&manga_comic`;

  const url =
    crossOriginPrefix + baseAPILink + apiMangaComic;
  console.log(`link: \n${url}`);

  console.log("awaiting mangaData");
  mangaData = await makeRequest(GET, url);

  console.log(`mangaData:`);
  console.log(mangaData);

  console.log("end of getManga()");

  return mangaData;
};
