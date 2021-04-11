// id constants
const quotesContainerId = "quotesContainer";

// window.onload = () => {
//   renderQuotes();
// };

/**
 * Renders the received quotes data.
 */
const renderQuotes = async () => {
  // container for the quotes
  const quotesContainer = document.getElementById(quotesContainerId);

  // execute GET method to grab the quotes from database
  const quotesData = await getQuotes();

  console.log("quotesData: ", quotesData);

  // put data into quotes container
  quotesData.map((curQuoteArr) => {
    curQuoteArr.map((curQuoteData) => {
      // paragraph element to hold the quote data
      const individualQuoteContainer = document.createElement(CREATE_P);

      console.log("curQuoteData", curQuoteData);

      // extracted quote data
      const quoteDetails = curQuoteData.details; // actual quote
      const quoteBy = curQuoteData.quote_by; // quote said by whom
      const quoteFrom = curQuoteData.quote_from; // media source of quote

      individualQuoteContainer.innerText = `"${quoteDetails}" -${quoteBy}, ${quoteFrom}`;

      quotesContainer.appendChild(individualQuoteContainer);
    });
  });
};

/**
 * Makes a request to extract quotes from the server.
 *
 * @returns array of quote data objects
 */
const getQuotes = async () => {
  let quotesData = [];

  const apiKeySuffix = `?api_key=${apiKey}`;
  const quoteIdSuffix = `?quote_id=`;

  const quoteIds = [];
  const NUM_QUOTES = 1;

  // add quote ids to read from to a local array
  for (let index = 0; index < NUM_QUOTES; index++) {
    quoteIds.push(index + 1);
  }

  console.log("quoteIds: ");
  console.log(quoteIds);

  // append quote_id query parameter
  const originalUrl =
    crossOriginPrefix + baseAPILink + apiQuotes + quoteIdSuffix;

  console.log("originalUrl: ", originalUrl);

  console.log("awaiting quotesData");

  for (let index = 0; index < NUM_QUOTES; index++) {
    const curQuoteId = quoteIds[index];
    console.log("curQuoteId: ", quoteIds[index]);
    console.log(`making request, index: ${curQuoteId}`);
    const urlToSend = originalUrl + curQuoteId;
    console.log(`link: \n${urlToSend}`);
    quotesData[index] = await makeRequest(GET, urlToSend);
  }

  return quotesData;
};

const goToCreatePost = () => {
  window.location.href = "./create.html";
}
