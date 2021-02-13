function writeData(name, score) {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://billyvunguyen.com/COMP4537/labs/5/?name=" + name + "&" + "score=" + score, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("lastMessage").innerHTML = name + ":" + score + " was added to DB";
            console.log("successful");
        } else {
            console.log("failed");
        }
    };
}

function onClickSubmit(e) {
    e.preventDefault();

    console.log("submit button clicked");

    // TODO: validate input
    // get input values
    const name = document.getElementById("name").value;
    const score = document.getElementById("score").value;

    writeData(name, score);
}