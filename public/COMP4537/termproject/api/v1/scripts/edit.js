// id constants
const addFormId = "addForm";
const nameInputId = "nameInput";
const commentInputId = "commentInput";
const favCharInputId = "favCharInput";
const posterInputId = "posterInput";
const updatePostButtonId = "updatePostButton";
const deletePostButtonId = "deletePostButton";

window.onload = () => {
  const postData = JSON.parse(localStorage.getItem("postData"));
  console.log("postData: \n", postData);
  renderLoadedData(postData);
};

const renderLoadedData = (postData) => {
  console.log("renderLoadedData()");

  console.log("postData: \n", postData);

  // the input values
  const nameInput = document.getElementById(nameInputId);
  const commentInput = document.getElementById(commentInputId);
  const favCharInput = document.getElementById(favCharInputId);
  const posterInput = document.getElementById(posterInputId);

  // OLD CODE:
  // if (postData.is_anime) {
  //   nameInput.value = postData.anime_name;
  // } else {
  //   nameInput.value = postData.manga_name;
  // }

  nameInput.value = postData.is_anime
    ? postData.anime_name
    : postData.manga_name;

  commentInput.value = postData.comment;
  favCharInput.value = postData.fav_char;
  posterInput.value = postData.posted_by;

  // object holding necessary data for updating and deleting methods
  const smallData = {
    id: postData.is_anime ? postData.anime_id : postData.manga_id,
    is_anime: postData.is_anime,
  };

  console.log("smallData: \n", smallData);

  addButtonListeners(smallData);

  console.log("end of renderLoadedData()");
};

const addButtonListeners = (smallData) => {
  console.log("addButtonListeners()");
  const updateButton = document.getElementById(updatePostButtonId);
  const deleteButton = document.getElementById(deletePostButtonId);

  // determines whether handleOnClick should handle for UPDATE or DELETE method
  let isUpdate = false;

  updateButton.addEventListener("click", () => {
    isUpdate = true;
    handleOnClick(smallData, isUpdate);
  });
  deleteButton.addEventListener("click", () => {
    isUpdate = false;
    handleOnClick(smallData, isUpdate);
  });
};

const handleOnClick = (smallData, isUpdate) => {
  console.log("handleOnClick()");

  // the input values
  const nameInputValue = document.getElementById(nameInputId).value.trim();
  const commentInputValue = document
    .getElementById(commentInputId)
    .value.trim();
  const favCharInputValue = document
    .getElementById(favCharInputId)
    .value.trim();
  const posterInputValue = document.getElementById(posterInputId).value.trim();

  console.log("nameInput ", nameInputValue);
  console.log("commentInput ", commentInputValue);
  console.log("favCharInput ", favCharInputValue);
  console.log("posterInput ", posterInputValue);

  // checks to see if any of the inputs are empty
  if (
    nameInputValue.length === 0 ||
    commentInputValue.length === 0 ||
    favCharInputValue.length === 0 ||
    posterInputValue.length === 0
  ) {
    alert("Please fill in all the input fields.");
    return;
  }

  // object holding all relevant data to be sent via POST method
  const postData = {
    id: smallData.id,
    is_anime: smallData.is_anime,
    name: nameInputValue,
    comment: commentInputValue,
    fav_char: favCharInputValue,
    posted_by: posterInputValue,
  };

  console.log("postData: \n", postData);

  // call update or delete depending on which button was clicked
  isUpdate ? updatePost(postData) : deletePost(smallData);
};

const updatePost = async (postData) => {
  console.log("updatePost()");

  // query parameters
  const apiSeriesTypeQuery = postData.is_anime
    ? apiAnimeCartoon
    : apiMangaComic;
  const idQuery = postData.is_anime
    ? `?anime_id=${postData.id}`
    : `?manga_id=${postData.id}`;
  const nameQuery = postData.is_anime
    ? `&anime_name=${postData.name}`
    : `&manga_name=${postData.name}`;
  const commentQuery = `&comment=${postData.comment}`;
  const favCharquery = `&fav_char=${postData.fav_char}`;
  const postedByQuery = `&posted_by=${postData.posted_by}`;

  const url =
    crossOriginPrefix +
    baseAPILink +
    apiSeriesTypeQuery +
    idQuery +
    nameQuery +
    commentQuery +
    favCharquery +
    postedByQuery;

  console.log(`link: \n${url}`);

  console.log("sending request");
  await makeRequest(PUT, url);
  console.log("server responded");

  alert("Post updated.");
};

const deletePost = async (postData) => {
  console.log("deletePost()");

  // query parameters
  const apiSeriesTypeQuery = postData.is_anime
    ? apiAnimeCartoon
    : apiMangaComic;
  const idQuery = postData.is_anime
    ? `?anime_id=${postData.id}`
    : `?manga_id=${postData.id}`;

  const url = crossOriginPrefix + baseAPILink + apiSeriesTypeQuery + idQuery;
  console.log(`link: \n${url}`);

  console.log("sending DELETE request");
  await makeRequest(DELETE, url);
  console.log("server responded");

  alert("Post deleted.");
};
