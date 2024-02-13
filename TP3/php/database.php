<?php
include('./constants.php');
function dbConnect() {
    $dsn = 'pgsql:dbname=' . DB_NAME . ';host=' . DB_SERVER . ';port=' . DB_PORT;
    try {
        $conn = new PDO($dsn, DB_USER, DB_PASSWORD);
        return $conn;
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
}

function dbGetChannels($pdo){
    $statement = $pdo->prepare('SELECT name FROM channels');
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    if(!empty($result)){
        return $result;
    }
    else{
        return false;
    }
}

function dbGetMessages($pdo, $channel_id){
    $statement = $pdo->prepare('SELECT nickname, message, timestamp FROM users JOIN messages ON users.login = messages.userlogin WHERE messages.channelid = :channel_id;');
    $statement->bindParam(':channel_id', $channel_id);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    if(empty($result)){
        return false;
    }
    else{
        return $result;
    }
}

function dbAddMessage($pdo, $userlogin, $channelid, $message){
    $statement = $pdo->prepare('INSERT INTO messages (userlogin, channelid, message) VALUES (:userlogin, :channelid, :message)');
    $statement->bindParam(':userlogin', $userlogin);
    $statement->bindParam(':channelid', $channelid);
    $statement->bindParam(':message', $message);
    $statement->execute();
    $result = $statement->rowCount();
    if($result == 1){
        return true;
    }
    else{
        return false;
    }
}