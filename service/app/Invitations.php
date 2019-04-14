<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invitations extends Model
{
    protected $fillable = [
        'username', 'contact'
    ];
}
