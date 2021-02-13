window.onLoad = readData();

function readData() {
    console.log("reading data");
    const xhttp = new XMLHttpRequest();

    const crossOriginPrefix = "https://limitless-depths-77398.herokuapp.com/";

    // const partnerServer = "https://billyvunguyen.com/COMP4537/labs/5/";
    const partnerServer = "https://billyvunguyen.com/COMP4537/testLab5/";

    document.getElementById("divRead").innerHTML = "<p>Loading data</p>";

    console.log("sending get request");
    xhttp.open("GET", crossOriginPrefix + partnerServer, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            parseData(xhttp.responseText);
            // document.getElementById("readText").innerHTML = xhttp.responseText;
            console.log("successful");
        } else {
            document.getElementById("divRead").innerHTML = "<p>Failed to load data</p>";
            console.log("failed");
        }
    };
}

function parseData(data) {
    let jsonArr = JSON.parse(data);
    
    // remove all children within div
    document.getElementById("divRead").innerHTML = "";

    jsonArr.forEach((person) => {
        let newText = document.createElement("p");
        newText.innerHTML = person.name + ":" + person.score;
        document.getElementById("divRead").appendChild(newText);
    });
}