// id constants
const addFormId = "addForm";
const nameInputId = "nameInput";
const commentInputId = "commentInput";
const favCharInputId = "favCharInput";
const posterInputId = "posterInput";
const animeChoiceId = "animeChoice";
const mangaChoiceId = "mangaChoice";
const createPostButtonId = "createPostButton";

const createPost = () => {
  // holds the form inputs
  const addForm = document.getElementById(addFormId);

  // the input values
  const nameInputValue = document.getElementById(nameInputId).value.trim();
  const commentInputValue = document
    .getElementById(commentInputId)
    .value.trim();
  const favCharInputValue = document
    .getElementById(favCharInputId)
    .value.trim();
  const posterInputValue = document.getElementById(posterInputId).value.trim();
  const animeChoiceValue = document.getElementById(animeChoiceId).checked;
  const mangaChoiceValue = document.getElementById(mangaChoiceId).checked;

  console.log("nameInput ", nameInputValue);
  console.log("commentInput ", commentInputValue);
  console.log("favCharInput ", favCharInputValue);
  console.log("posterInput ", posterInputValue);
  console.log("animeChoice ", animeChoiceValue);
  console.log("mangaChoice ", mangaChoiceValue);

  // checks to see if any of the inputs are empty
  if (
    nameInputValue.length === 0 ||
    commentInputValue.length === 0 ||
    favCharInputValue.length === 0 ||
    posterInputValue.length === 0 ||
    (!animeChoiceValue && !mangaChoiceValue)
  ) {
    alert("Please fill in all the input fields.");
    return;
  }

  // object holding all relevant data to be sent via POST method
  const postData = {
    name: nameInputValue,
    comment: commentInputValue,
    fav_char: favCharInputValue,
    posted_by: posterInputValue,
  };

  // execute a POST method to the server
  // the endpoint varies depending on which of the two radio buttons
  // are checked
  if (animeChoiceValue) postAnime(postData);
  else postManga(postData);

  alert("Post created.");
};

const postAnime = async (postData) => {
  console.log("postAnime()");
  let animeData = [];

  // query parameters
  const apiKeySuffix = `?api_key=${apiKey}`;
  // const animeSuffix = `?anime_cartoon`;
  const nameQuery = `?anime_name=${postData.name}`;
  const commentQuery = `&comment=${postData.comment}`;
  const favCharquery = `&fav_char=${postData.fav_char}`;
  const postedByQuery = `&posted_by=${postData.posted_by}`;

  const url =
    crossOriginPrefix +
    baseAPILink +
    apiAnimeCartoon +
    nameQuery +
    commentQuery +
    favCharquery +
    postedByQuery;
  console.log(`link: \n${url}`);

  console.log(`animeData BEFORE:`);
  console.log(animeData);

  console.log("sending animeData");
  animeData = await makeRequest(POST, url);

  console.log(`animeData AFTER:`);
  console.log(animeData);

  console.log("end of postAnime()");

  return animeData;
};

const postManga = async (postData) => {
  console.log("postManga()");
  let mangaData = [];

  // query parameters
  const apiKeySuffix = `?api_key=${apiKey}`;
  // const mangaSuffix = `&manga_comic`;
  const nameQuery = `?manga_name=${postData.name}`;
  const commentQuery = `&comment=${postData.comment}`;
  const favCharquery = `&fav_char=${postData.fav_char}`;
  const postedByQuery = `&posted_by=${postData.posted_by}`;

  const url =
    crossOriginPrefix +
    baseAPILink +
    apiMangaComic +
    nameQuery +
    commentQuery +
    favCharquery +
    postedByQuery;
  console.log(`link: \n${url}`);

  console.log(`animeData BEFORE:`);
  console.log(mangaData);

  console.log("sending animeData");
  mangaData = await makeRequest(POST, url);

  console.log(`animeData AFTER:`);
  console.log(mangaData);

  console.log("end of postAnime()");

  return mangaData;
};

document
  .getElementById(createPostButtonId)
  .addEventListener("click", createPost);
