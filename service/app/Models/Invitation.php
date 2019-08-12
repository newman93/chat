<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 15 May 2019 19:57:24 +0000.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;

/**
 * Class Invitation
 * 
 * @property int $id
 * @property int $username
 * @property int $contact
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class Invitation extends Eloquent
{
	protected $casts = [
		'username' => 'int',
		'contact' => 'int'
	];

	protected $fillable = [
		'username',
		'contact'
	];

	public function username()
	{
		return $this->belongsTo(\App\Models\User::class, 'username');
	}

    public function contact()
    {
        return $this->belongsTo(\App\Models\User::class, 'contact');
    }
}
