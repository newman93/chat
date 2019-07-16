<?php
/**
 * Created by PhpStorm.
 * User: adrian
 * Date: 16.07.19
 * Time: 20:40
 */

namespace App\Providers;


use App\Models\Message;

class MessagesServiceProvider
{
    public function getMessages($fromUsernameId, $toUsernameId)
    {
        return Message::with('user')
            ->whereRaw('(from_username =  ? AND to_username = ?) 
                OR  (from_username = ? AND to_username = ?)',
                [
                     $fromUsernameId, $toUsernameId, $toUsernameId, $fromUsernameId
                ]
            )->orderBy('date', 'ASC')->get();
    }
}
