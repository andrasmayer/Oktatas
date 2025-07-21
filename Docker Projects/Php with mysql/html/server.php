<?php

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

require __DIR__ . '/vendor/Ratchet/vendor/autoload.php';

class MyChat implements MessageComponentInterface {
    protected $clients;
    protected $users;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->users = [];
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);

        if (isset($conn->httpRequest)) {
            $queryString = $conn->httpRequest->getUri()->getQuery();
            parse_str($queryString, $queryParams);

            if (isset($queryParams['id']) && isset($queryParams['userName'])) {
                $userId = $queryParams['id'];
                $userName = $queryParams['userName'];

                if (isset($this->users[$userId])) {
                    $conn->send(json_encode([
                        'type' => 'error',
                        'message' => 'Ez az azonosító már foglalt.'
                    ]));
                    $conn->close();
                    return;
                }

                // Tárolás
                $this->users[$userId] = [
                    'conn' => $conn,
                    'userName' => $userName
                ];
                $conn->userId = $userId;

                echo "Kapcsolódott: $userId ($userName)\n";
                $this->broadcastUserList();

            } else {
                $conn->send(json_encode([
                    'type' => 'error',
                    'message' => 'Hiányzó id vagy userName.'
                ]));
                $conn->close();
            }
        }
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $message = json_decode($msg,true);
        if($message["type"] == "whisper"){
            echo "Privát üzenet " .$message["to"]["userName"] . " felhasználónak: " .$message["from"]["userName"] ." tól\n\n";

            $this->users[$message["to"]["userId"]]['conn']->send(
                json_encode([
                    'type' => 'whisper',
                    'from' => $message["from"],
                    'message' => $message["message"],
                    'to' => $message["to"]
                ])
            );

        }
        else if($message["type"] == "logOut"){
            $from->close();
        }
        else{//Ha bármi más típus
            foreach ($this->clients as $client) {
                $client->send($msg);
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        if (isset($conn->userId)) {
            unset($this->users[$conn->userId]);
            echo "Kilépett: userId = {$conn->userId}\n";
            $this->broadcastUserList();
        }
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "Hiba: {$e->getMessage()}\n";
        $conn->close();
    }

    protected function broadcastUserList() {
        $userList = [];

        foreach ($this->users as $userId => $userData) {
            $userList[] = [
                'id' => $userId,
                'userName' => $userData['userName']
            ];
        }

        foreach ($this->clients as $client) {
            $client->send(json_encode([
                'type' => 'user_list',
                'users' => $userList
            ]));
        }
    }
}

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new MyChat()
        )
    ),
    8091,
    '0.0.0.0'
);

$server->run();