<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Messages extends Model
{
    protected $fillable = [
        'from_username', 'to_username', 'message', 'to_read', 'date'
    ];
}
