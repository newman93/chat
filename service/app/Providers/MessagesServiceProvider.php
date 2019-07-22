<?php
/**
 * Created by PhpStorm.
 * User: adrian
 * Date: 16.07.19
 * Time: 20:40
 */

namespace App\Providers;


use App\Models\Message;
use App\Models\User;

class MessagesServiceProvider
{
    public function getMessages($fromUsernameId, $toUsernameId)
    {
        $fromUsername = User::find($fromUsernameId);

        if (!is_null($fromUsername)) {
            $data['name'] = $fromUsername->name;
            $data['surname'] = $fromUsername->surname;
            $data['avatar'] = $fromUsername->avatar;
            $data['id'] = $fromUsername->id;
            $data['username'] = $fromUsername->username;
        }
        $data['messages'] =
             Message::with('fromUsername', 'toUsername')
            ->whereRaw('(from_username =  ? AND to_username = ?) 
                OR  (from_username = ? AND to_username = ?)',
                [
                     $fromUsernameId, $toUsernameId, $toUsernameId, $fromUsernameId
                ]
            )->orderBy('date', 'ASC')->get();

        return $data;
    }

    public function sendMessage($fromUsernameId, $toUsernameId, $message) {
        return Message::create([
            'from_username' => $fromUsernameId,
            'to_username' => $toUsernameId,
            'message' => $message,
            'to_read' => 1,
            'date' => date("Y-m-d H:i:s")
        ]);
    }
}
