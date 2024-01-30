console.log("ajax.js chargé");

function ajaxRequest(type, url, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.onload = () => {
        switch (xhr.status){
            case 200:
            case 201:
                callback(xhr.responseText);
                break;
            default:
                httpErrors(xhr.status)
                break;
        }
    };
    xhr.send();
}

function displayTimestamp(response){
    response = '<i class="fa-solid fa-clock"></i> ' + response;
    document.getElementById("timestamp").innerHTML = response;
}

function httpErrors(errorCode){
    document.getElementById("errors").style.display = "block";
    switch (errorCode) {
        case 400:
            document.getElementById("errors").innerHTML = "<i class='fa-solid fa-circle-exclamation'></i> 400: Requête incorrecte";
            break;
        case 401:
            document.getElementById("errors").innerHTML = "<i class='fa-solid fa-circle-exclamation'></i> 401: Authentifiez-vous";
            break;
        case 403:
            document.getElementById("errors").innerHTML = "<i class='fa-solid fa-circle-exclamation'></i> 403: Accès refusé";
            break;
        case 404:
            document.getElementById("errors").innerHTML = "<i class='fa-solid fa-circle-exclamation'></i> 404: Page non trouvée";
            break;
        case 500:
            document.getElementById("errors").innerHTML = "<i class='fa-solid fa-circle-exclamation'></i> 500: Erreur interne du serveur";
            break;
        case 503:
            document.getElementById("errors").innerHTML = "<i class='fa-solid fa-circle-exclamation'></i> 503: Service indisponible";
            break;
    }
}


setInterval(() => {
    ajaxRequest("GET", "php/timestamp.php", displayTimestamp);
}, 1000);