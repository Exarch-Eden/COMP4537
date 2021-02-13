window.onLoad = readData();

function readData() {
    console.log("reading data");
    const xhttp = new XMLHttpRequest();

    const crossOriginPrefix = "https://limitless-depths-77398.herokuapp.com/";

    const partnerServer = "https://billyvunguyen.com/COMP4537/labs/5/";

    console.log("sending get request");
    xhttp.open("GET", crossOriginPrefix + partnerServer, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("readText").innerHTML = xhttp.responseText;
            console.log("successful");
        } else {
            console.log("failed");
        }
    };
}