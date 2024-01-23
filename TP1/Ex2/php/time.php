<?php
  // Generate timestamp.
  $date = getdate();
  $data = array('Il est : '.$date['hours'].':'.$date['minutes'].':'.
    $date['seconds'], array('hours' => $date['hours'], 'minutes' => $date['minutes'], 'seconds' => $date['seconds']));
  
  // Send data to the client.
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-control: no-store, no-cache, must-revalidate');
  header('Pragma: no-cache');
  header('HTTP/1.1 200 OK');
  $data = json_encode($data);
  echo $data;
  exit;
?>
