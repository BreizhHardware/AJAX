console.log("API tierces");

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
                break;
        }
    };
    xhr.send();
}


const citybutton = document.getElementById("respcity");
citybutton.addEventListener('click', clickCityBtn);

function clickCityBtn(){
    let city = document.getElementById("cityname").value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=03be1ec9a991156f495f1430c1ad67e0";
    ajaxRequest("GET", url, showCity);
}

const citybutton2 = document.getElementById("respcity2");
citybutton2.addEventListener('click', clickCityBtn2);

function clickCityBtn2(){
    let apikey = "42113171-2817f10460fce832c3b5329c8";
    let city = document.getElementById("cityname2").value;
    let url = "https://pixabay.com/api/?key=" + apikey + "&q=" + city;
    ajaxRequest("GET", url, showCity2);
}

function KelvinToCelsius(kelvin){
    return kelvin - 273.15;
}

function showCity(response){
    let city = JSON.parse(response);
    console.log(city);
    //Table
    let table = document.createElement("table");
    //With Id, City name, Country, Humidity, Temperature max, temperature min
    let id = document.createElement("tr");
    let cityname = document.createElement("tr");
    let country = document.createElement("tr");
    let humidity = document.createElement("tr");
    let tempmax = document.createElement("tr");
    let tempmin = document.createElement("tr");
    //Id
    let idtext = document.createElement("td");
    idtext.innerHTML = "Id";
    id.appendChild(idtext);
    let idvalue = document.createElement("td");
    idvalue.innerHTML = city.id;
    id.appendChild(idvalue);
    //City name
    let citynametext = document.createElement("td");
    citynametext.innerHTML = "City name";
    cityname.appendChild(citynametext);
    let citynamevalue = document.createElement("td");
    citynamevalue.innerHTML = city.name;
    cityname.appendChild(citynamevalue);
    //Country
    let countrytext = document.createElement("td");
    countrytext.innerHTML = "Country";
    country.appendChild(countrytext);
    let countryvalue = document.createElement("td");
    countryvalue.innerHTML = city.sys.country;
    country.appendChild(countryvalue);
    //Humidity
    let humiditytext = document.createElement("td");
    humiditytext.innerHTML = "Humidity";
    humidity.appendChild(humiditytext);
    let humidityvalue = document.createElement("td");
    humidityvalue.innerHTML = city.main.humidity;
    humidity.appendChild(humidityvalue);
    //Temperature max
    let tempmaxtext = document.createElement("td");
    tempmaxtext.innerHTML = "Temperature max";
    tempmax.appendChild(tempmaxtext);
    let tempmaxvalue = document.createElement("td");
    tempmaxC = KelvinToCelsius(city.main.temp_max);
    tempmaxvalue.innerHTML = tempmaxC;
    tempmax.appendChild(tempmaxvalue);
    //Temperature min
    let tempmintext = document.createElement("td");
    tempmintext.innerHTML = "Temperature min";
    tempmin.appendChild(tempmintext);
    let tempminvalue = document.createElement("td");
    tempminC = KelvinToCelsius(city.main.temp_min);
    tempminvalue.innerHTML = tempminC;
    tempmin.appendChild(tempminvalue);
    //Append
    table.appendChild(id);
    table.appendChild(cityname);
    table.appendChild(country);
    table.appendChild(humidity);
    table.appendChild(tempmax);
    table.appendChild(tempmin);
    //Append table
    let cityarea = document.getElementById("cityinfo");
    cityarea.innerHTML = "";
    cityarea.appendChild(table);
}

function showCity2(response){
    let city = JSON.parse(response);
    console.log(city);
    let table = document.createElement("table");
    let tags = document.createElement("tr");
    let images = document.createElement("tr");
    for(let i = 0; i < 5; i++){
        let tag = document.createElement("td");
        tag.innerHTML = city.hits[i].tags;
        tags.appendChild(tag);
    }
    for(let i = 0; i < 5; i++){
        let image = document.createElement("td");
        let img = document.createElement("img");
        img.src = city.hits[i].webformatURL;
        img.className = "img-thumbnail";
        image.appendChild(img);
        images.appendChild(image);
    }
    table.appendChild(tags);
    table.appendChild(images);
    let cityarea = document.getElementById("cityinfo2");
    cityarea.innerHTML = "";
    cityarea.appendChild(table);
}