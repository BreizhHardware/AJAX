console.log("chat.js loaded");

// Define callbacks
/*
let envoyerB = document.querySelector(".secon");
envoyerB.addEventListener("submit", login);

let sedecB = document.querySelector(".sedec");
sedecB.addEventListener("click", logout);
*/


function getChannels(){
    ajaxRequest("GET", "http://serveur-ajax-s3.felix/TP3/php/chat.php?request=channels", displayChannels);
}

function displayChannels(channels){
    let channelsList = document.getElementById("channels-list");
    channels.forEach(channel => {
        if(channel.id === 1){
            let option = document.createElement("option");
            option.value = channel.id;
            option.textContent = channel.name;
            channelsList.appendChild(option);
            option.selected = true;
        }else{
            let option = document.createElement("option");
            option.value = channel.id;
            option.textContent = channel.name;
            channelsList.appendChild(option);
        }
    });
    getMessages();
}

function getMessages(){
    let channelsList = document.getElementById("channels-list");
    if(channelsList.selectedIndex !== -1) {
        let channelId = channelsList.options[channelsList.selectedIndex].value;
        ajaxRequest("GET", "http://serveur-ajax-s3.felix/TP3/php/chat.php?request=messages&channel_id=" + channelId, displayMessages);
    }else{
        console.log("No channel selected");
    }
}

function displayMessages(messages){
    let chatRoom = document.getElementById("chat-room");
    chatRoom.value = "";
    if (messages.length === 0){
        // No messages
    }else{
        messages.forEach(message => {
            chatRoom.value += message.nickname + ": " + message.message + "\n";
        });
    }
    chatRoom.scrollTop = chatRoom.scrollHeight;
}

function sendMessage(){
    event.preventDefault();
    let channelsList = document.getElementById("channels-list");
    let channelId = channelsList.options[channelsList.selectedIndex].value;
    const message = document.getElementById("message").value;
    document.getElementById("message").value = "";
    if(message === ""){
        return;
    }
    ajaxRequest("POST", "http://serveur-ajax-s3.felix/TP3/php/chat.php?request=messages", getMessages, "&channel_id=" + channelId + "&userlogin=etudiant0&message=" + message);
}

getChannels();

document.getElementById("channels-list").addEventListener("change", getMessages);

document.getElementById("send-message").addEventListener("click", sendMessage);

document.getElementById("message").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        sendMessage();
    }
});

setInterval(getMessages, 1000);