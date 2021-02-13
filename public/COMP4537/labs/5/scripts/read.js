window.onLoad = readData();

function readData() {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://billyvunguyen.com/COMP4537/labs/5/", true);
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