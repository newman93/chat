<?php

namespace App\Http\Controllers;


use App\Providers\MessagesServiceProvider;
use Symfony\Component\HttpFoundation\Request;

class MessagesController extends Controller
{
    public function __construct() {
        $this->middleware('api');
    }


    public function loadMessages($fromUsernameId, $toUsernameId, MessagesServiceProvider $messagesService) {
        return  $messagesService->getMessages($fromUsernameId, $toUsernameId);
    }

    public function sendMessage(Request $request, $fromUsernameId, $toUsernameId, MessagesServiceProvider $messagesService) {
        $messagesService->sendMessage($fromUsernameId, $toUsernameId, $request->get('message'));
    }
}
