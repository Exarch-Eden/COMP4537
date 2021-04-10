// id constants
const mangaPostsContainerId = "mangaPostsContainer";

window.onload = () => {
  renderQuotes();
}

// /**
//  * Renders the received quotes data.
//  */
// const renderAnimePosts = async () => {
//   // container for the quotes
//   const quotesContainer = document.getElementById(quotesContainerId);

//   // execute GET method to grab the quotes from database
//   const quotesData = await getQuotes();

//   console.log("quotesData: ", quotesData);

//   // put data into quotes container
//   quotesData.map((curQuoteArr) => {
//     curQuoteArr.map((curQuoteData) => {
//       // paragraph element to hold the quote data
//       const individualQuoteContainer = document.createElement(CREATE_P);

//       console.log("curQuoteData", curQuoteData);

//       // extracted quote data
//       const quoteDetails = curQuoteData.details; // actual quote
//       const quoteBy = curQuoteData.quote_by; // quote said by whom
//       const quoteFrom = curQuoteData.quote_from; // media source of quote

//       individualQuoteContainer.innerText = `"${quoteDetails}" -${quoteBy}, ${quoteFrom}`;

//       quotesContainer.appendChild(individualQuoteContainer);
//     });
//   });
// };

