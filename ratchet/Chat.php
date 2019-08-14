<?php
/**
 * Created by PhpStorm.
 * User: adrian
 * Date: 13.08.19
 * Time: 12:06
 */
require_once 'vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    protected $clients = [];
    protected $clientsMap;

    public function onOpen(ConnectionInterface $conn) {
        $this->clients[$conn->resourceId] = $conn;
    }

    public function onMessage(ConnectionInterface $from, $msg) {
         $data = json_decode($msg, true);
        var_dump($data);
        switch ($data['type']) {
              case "login":
                           if (!(isset($this->clientsMap[$data['fromUsername']]))) {
                                $this->clientsMap[$data['fromUsername']] = $from->resourceId;

                                foreach ($this->clientsMap as $key=>$value) {
                                   $this->clients[$this->clientsMap[$key]]->send(
                                       json_encode($data)
                                   );
                                }
                           }
                            break;
         /*  case "leave":
                      echo "lol0";
                      if (isset($this->clientsMap[$data['username']])) {
                        //$this->clients[$this->clientsMap[$data['username']]]->send(json_encode(['type'=>'login', 'state'=> 'success']));
                        $users = json_decode($data['users'], true);
                        if (!(isset($users[0]['empty']))) {
                         foreach ($users as $key=>$user) {
                          if (isset($this->clientsMap[$user['username']])) {
                           echo "lol";
                           $this->clients[$this->clientsMap[$user['username']]]->send(json_encode(['type' => 'user-leave', 'username' => $data['username']]));
                           }
                         }
                        }
                        unset($this->clients[$this->clientsMap[$data['username']]]);
                        unset($this->clientsMap[$data['username']]);
                        //array_push(['resource_id' => $from->resourceId, 'username' => $data['username']], $clientsMap);
                       }
                      break;
          *
          */
        /*  case "offer":
                      $toClient = isset($this->clientsMap[$data['toUsername']])? $this->clients[$this->clientsMap[$data['toUsername']]] : null;

                      if($toClient != null) {
                       $toClient->send(json_encode(['type' => 'offer', 'fromUsername' => $data['username']]));
                      }
                      break;
          case "accepted":
                      $toClient = isset($this->clientsMap[$data['toUsername']])? $this->clients[$this->clientsMap[$data['toUsername']]] : null;

                      if($toClient != null) {
                       $toClient->send(json_encode(['type' => 'accepted', 'fromUsername' => $data['fromUsername']]));
                      }
                      break;

          case "answer":
                        $toClient = isset($this->clientsMap[$data['toUsername']])? $this->clients[$this->clientsMap[$data['toUsername']]] : null;

                        if($toClient != null) {
                         $toClient->send(json_encode(['type' => 'answer', 'message'=> $data['message'], 'fromUsername' => $data['username']]));
                        }
                        break;
          case "leave":
                       $toClient = isset($this->clientsMap[$data['toUsername']])? $this->clients[$this->clientsMap[$data['toUsername']]] : null;

                       if($toClient != null) {
                         $toClient->send(json_encode(['type' => 'leave', 'fromUsername' => $data['username']]));
                       }
                       break;
         */
          case "message":
                      $toClient = isset($this->clientsMap[$data['toUsername']])?
                          $this->clients[$this->clientsMap[$data['toUsername']]] : null;

                      if (!is_null($toClient)) {
                        $toClient->send(json_encode([$data]));
                      }

                      break;
          }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        //$this->clients->detach($conn);
//        $user_leave = array_search($conn->resourceId, $this->clientsMap);
//        foreach($this->clients as $client)
//         $client->send(json_encode(['type' => 'user-leave', 'username' => $user_leave]));
//        unset($this->clients[$conn->resourceId]);
//        unset($this->clientsMap[$user_leave]);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}


