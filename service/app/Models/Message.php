<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 15 May 2019 19:57:24 +0000.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;

/**
 * Class Message
 * 
 * @property int $id
 * @property int $from_username
 * @property int $to_username
 * @property string $message
 * @property int $to_read
 * @property \Carbon\Carbon $date
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class Message extends Eloquent
{
	protected $casts = [
		'from_username' => 'int',
		'to_username' => 'int',
		'to_read' => 'int'
	];

	protected $dates = [
		'date'
	];

	protected $fillable = [
		'from_username',
		'to_username',
		'message',
		'to_read',
		'date'
	];

	public function fromUsername()
	{
		return $this->belongsTo(\App\Models\User::class, 'from_username');
	}

	public function toUsername()
    {
        return $this->belongsTo(\App\Models\User::class, 'to_username');
    }
}
