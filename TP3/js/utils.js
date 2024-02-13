console.log("utils.js loaded");

function ajaxRequest(type, url, callback=null, data=null){
    console.log("ajaxRequest called");
    console.log("type: " + type);
    console.log("url: " + url);
    let xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
        switch (xhr.status){
            case 200:
            case 201:
                let parsedResponse = JSON.parse(xhr.responseText);
                if (callback){
                    callback(parsedResponse);
                }
                break;
            default:
                errorAlert("Erreur " + xhr.status + ": " + xhr.statusText);
                break;
        }
    };
    xhr.send(data);
}


function errorAlert(message){
    let error = document.getElementById("errors");
    error.textContent = message;
    error.classList.toggle("d-none");
    setTimeout(() => {
        error.classList.toggle("d-none");
    }, 5000);
}
