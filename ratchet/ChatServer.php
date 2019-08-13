<?php
/**
 * Created by PhpStorm.
 * User: adrian
 * Date: 13.08.19
 * Time: 12:09
 */
require_once 'vendor/autoload.php';
require_once 'Chat.php';

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;


    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new Chat()
            )
        ),
        8080
    );

    $server->run();
