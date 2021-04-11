// id constants
const mangaPostsContainerId = "mangaPostsContainer";

window.onload = () => {
  renderQuotes();
  renderMangaPosts();
};

/**
 * Renders the received quotes data.
 */
const renderMangaPosts = async () => {
  // container for the manga posts
  const mangaPostsContainer = document.getElementById(mangaPostsContainerId);

  // execute GET method to grab the manga data from database
  const mangaData = await getManga();

  console.log("mangaData: ", mangaData);

  // put data into manga posts container
  mangaData.map((curMangaPost) => {
    console.log("curMangaPost: \n", curMangaPost);

    // div container to hold all data for this post
    const individualPostContainer = document.createElement(CREATE_DIV);

    // extracted anime post data
    const mangaName = curMangaPost.manga_name;
    const comment = curMangaPost.comment;
    const favChar = curMangaPost.fav_char;
    const poster = curMangaPost.posted_by;

    // containers to each hold a piece of information from the extracted data
    const mangaNameContainer = document.createElement(CREATE_P);
    const commentContainer = document.createElement(CREATE_P);
    const favCharContainer = document.createElement(CREATE_P);
    const posterContainer = document.createElement(CREATE_P);

    // add information from extracted data to containers
    mangaNameContainer.innerText = mangaName;
    commentContainer.innerText = comment;
    favCharContainer.innerText = `Favourite Character: ${favChar}`;
    posterContainer.innerText = `Posted by ${poster}`;

    // append separate information containers to post container
    individualPostContainer.appendChild(mangaNameContainer);
    individualPostContainer.appendChild(commentContainer);
    individualPostContainer.appendChild(favCharContainer);
    individualPostContainer.appendChild(posterContainer);

    // append current post container to all posts container
    mangaPostsContainer.appendChild(individualPostContainer);
  });
};

const getManga = async () => {
  let mangaData = [];

  const apiKeySuffix = `?api_key=${apiKey}`;
  const mangaSuffix = `?${apiMangaComic}`;

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
