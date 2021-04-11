// id constants
const animePostsContainerId = "animePostsContainer";

window.onload = () => {
  renderQuotes();
  renderAnimePosts();
}

/**
 * Renders the received quotes data.
 */
const renderAnimePosts = async () => {
  // container for the anime posts
  const animePostsContainer = document.getElementById(animePostsContainerId);

  // execute GET method to grab the anime data from database
  const animeData = await getAnime();

  console.log("animeData: ", animeData);

  // put data into anime posts container
  animeData.map((curAnimePost) => {
    console.log("curAnimePost: \n", curAnimePost);
    
    // div container to hold all data for this post
    const individualPostContainer = document.createElement(CREATE_DIV);

    // extracted anime post data
    const animeId = curAnimePost.anime_id;
    const animeName = curAnimePost.anime_name;
    const comment = curAnimePost.comment;
    const favChar = curAnimePost.fav_char;
    const poster = curAnimePost.posted_by;

    // containers to each hold a piece of information from the extracted data
    const animeNameContainer = document.createElement(CREATE_P);
    const commentContainer = document.createElement(CREATE_P);
    const favCharContainer = document.createElement(CREATE_P);
    const posterContainer = document.createElement(CREATE_P);
    
    // add information from extracted data to containers
    animeNameContainer.innerText = animeName;
    commentContainer.innerText = comment;
    favCharContainer.innerText = `Favourite Character: ${favChar}`;
    posterContainer.innerText = `Posted by ${poster}`;

    // append separate information containers to post container
    individualPostContainer.appendChild(animeNameContainer);
    individualPostContainer.appendChild(commentContainer);
    individualPostContainer.appendChild(favCharContainer);
    individualPostContainer.appendChild(posterContainer);

    // append current post container to all posts container
    animePostsContainer.appendChild(individualPostContainer);
  });
};

const getAnime = async () => {
  let animeData = [];

  // query parameters
  const apiKeySuffix = `?api_key=${apiKey}`;
  const animeSuffix = `?${apiAnimeCartoon}`;

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
