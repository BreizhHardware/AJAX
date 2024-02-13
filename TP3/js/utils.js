console.log("utils.js loaded");

function ajaxRequest(type, url, callback=null, data=null){
    let xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
        switch (xhr.status){
            case 200:
            case 201:
                if(xhr.responseText.trim() !== ''){
                    try {
                        let parsedResponse = JSON.parse(xhr.responseText);
                        if (callback){
                            callback(parsedResponse);
                        }
                    }
                    catch (e){
                        errorAlert("Erreur: " + e);
                    }
                }
                else{
                    errorAlert("Erreur: Aucune donnée reçue");
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
