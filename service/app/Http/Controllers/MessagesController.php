<?php

namespace App\Http\Controllers;


use App\Providers\MessagesServiceProvider;

class MessagesController extends Controller
{
    public function __construct() {
        $this->middleware('api');
    }


    public function loadMessages($fromUsernameId, $toUsernameId, MessagesServiceProvider $messagesService) {
        return  $messagesService->getMessages($fromUsernameId, $toUsernameId);
    }
}
