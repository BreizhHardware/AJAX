/**
 * @Author: Ayoub KARINE
 * @Company: ISEN Yncréa Ouest
 * @Email: ayoub.karine@isen-ouest.yncrea.fr
 * @Created Date: 21-Apr-2021 - 14:31:15
 * @Last Modified: 21-Apr-2021 - 20:02:21
 */
// ----------------- utils -------------------
function showhide(id) {
  let e = document.getElementById(id);
  let eClasses = e.classList;
  eClasses.toggle('d-none');
}
// ----------------- Gihub API -------------------
const github = document.getElementById("github");
github.addEventListener('click', showGithub);
function showGithub() {
  showhide("githuarea");
  showhide("catarea");
}
// To do
// ----------------- Cat API -------------------
const cat = document.getElementById("cat");
cat.addEventListener('click', showCat);
function showCat() {
  showhide("catarea");
  showhide("githuarea");
}
// To do

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

const catbutton = document.getElementById("respcat");
catbutton.addEventListener('click', clickCatBtn);
function clickCatBtn(){
  let text = document.getElementById("texteinimage").value;
  const date = new Date();
  date.getTime()
  let url = "https://cataas.com/cat/says/" + text + "?size=40/?ts=" + date;
  ajaxRequest("GET", url, showCatResponse);
}

const githubbutton = document.getElementById("respgithub");
githubbutton.addEventListener('click', clickGithubBtn);
function clickGithubBtn(){
  let username = document.getElementById("githubname").value;
  let url = "https://api.github.com/users/" + username;
  ajaxRequest("GET", url, showGithubUser);
}


function showGithubUser(response){
  let user = JSON.parse(response);
  let githubarea = document.getElementById("githuarea");
  githubarea.innerHTML = "";
  let img = document.createElement("img");
  img.src = user.avatar_url;
  img.className = "img-thumbnail";
  githubarea.appendChild(img);
  let name = document.createElement("h3");
  name.innerText = user.name;
  githubarea.appendChild(name);
  let login = document.createElement("p");
  login.innerText = user.login;
  githubarea.appendChild(login);
  let bio = document.createElement("p");
  bio.innerText = user.bio;
  githubarea.appendChild(bio);
}

function showCatResponse(response){
    let catarea = document.getElementById("catarea");
    catarea.innerHTML = "";
    let img = document.createElement("img");
    img.src = response;
    img.className = "img-thumbnail";
    catarea.appendChild(img);
}