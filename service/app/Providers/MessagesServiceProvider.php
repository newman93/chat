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

        $data['name'] = $fromUsername->name;
        $data['surname'] = $fromUsername->surname;
        $data['avatar'] = $fromUsername->avatar;
        $data['id'] = $fromUsername->id;

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
}
