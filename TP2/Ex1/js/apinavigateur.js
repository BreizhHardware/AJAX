console.log("apinavigateur.js chargé");


let lat = document.getElementById("lat");
let lat_button = document.getElementById("latitude");

let long = document.getElementById("long");
let long_button = document.getElementById("longitude");

lat_button.addEventListener("click",()=>{
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position);
            lat.innerHTML = "Latitude :" + position.coords.latitude;
        })
    }else{
        lat.innerHTML = "Geolocation is not supported by this browser.";
    }
})

long_button.addEventListener("click",()=>{
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position);
            long.innerHTML = "Longitude :" + position.coords.longitude;
        })
    }else{
        long.innerHTML = "Geolocation is not supported by this browser.";
    }
})

let InputPg = document.getElementById("nbpages");
let buttonPg = document.getElementById("reculer");

buttonPg.addEventListener("click",()=>{
    console.log("history length :"+window.history.length);
    console.log(InputPg.value);
    window.history.go(-parseInt(InputPg.value));
})