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

function editTitleAndDetails(response){
    let title = document.getElementById("title");
    let details = document.getElementById("detail");
    let json = JSON.parse(response);
    title.innerHTML = json[0];
    details.innerHTML = "Heures : " + json[1].hours + " Minutes : " + json[1].minutes + " Secondes : " + json[1].seconds;
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

setInterval(ajaxRequest, 1000, 'GET', 'php/time.php', editTitleAndDetails);