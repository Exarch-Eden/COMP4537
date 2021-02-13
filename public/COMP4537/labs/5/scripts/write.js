function writeData(name, score) {
    const xhttp = new XMLHttpRequest();

    const crossOriginPrefix = "https://limitless-depths-77398.herokuapp.com/";
    // const crossOriginPrefix = "https://cors-anywhere.herokuapp.com/";

    // const partnerServer = "https://billyvunguyen.com/COMP4537/labs/5/?name=" + name + "&" + "score=" + score;
    const partnerServer = "https://billyvunguyen.com/COMP4537/testLab5/?name=" + name + "&" + "score=" + score;

    const google = "https://google.ca/";

    xhttp.open("GET", crossOriginPrefix + partnerServer, true);
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

    if (name == "" || name === undefined || score == "" || score === undefined) {
        return;
    } else {
        writeData(name, score);
    }
}