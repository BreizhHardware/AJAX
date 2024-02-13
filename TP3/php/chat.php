<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include('./database.php');

$pdo = dbConnect();

if(isset($_GET['request']) && $_GET['request'] == 'channels'){
    $channels = dbGetChannels($pdo);
    if($channels){
        $formattedChannels = [];
        $id = 1;
        foreach($channels as $channel){
            $formattedChannels[] = ['id' => $id, 'name' => $channel['name']];
            $id++;
        }
        echo json_encode($formattedChannels);
    }
    else{
        echo json_encode('No channels found');
    }
}

if(isset($_GET['request']) && $_GET['request'] == 'messages' && $_GET['channel_id']){
    $channel_id = intval($_GET['channel_id']);
    $messages = dbGetMessages($pdo, $channel_id);
    if($messages){
        echo json_encode($messages);
    }
    else{
        echo json_encode([]);
    }
}

if(isset($_POST['request']) && $_POST['request'] == 'messages' && $_POST['channel_id'] && $_POST['userlogin'] && $_POST['message']){
    $channel_id = intval($_POST['channel_id']);
    $userlogin = $_POST['userlogin'];
    $message = $_POST['message'];
    $result = dbAddMessage($pdo, $userlogin, $channel_id, $message);
    if($result){
        echo json_encode('Message added');
    }
    else{
        echo json_encode('Message not added');
    }
}