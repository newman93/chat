<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 15 May 2019 19:57:24 +0000.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;

/**
 * Class User
 * 
 * @property int $id
 * @property string $username
 * @property string $password
 * @property string $e_mail
 * @property string $name
 * @property string $surname
 * @property string $avatar
 * @property string $function
 * @property int $active
 * @property string $remember_token
 * @property \Carbon\Carbon $email_verified_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $contacts
 * @property \Illuminate\Database\Eloquent\Collection $invitations
 * @property \Illuminate\Database\Eloquent\Collection $messages
 *
 * @package App\Models
 */
class User extends Eloquent
{
	protected $casts = [
		'active' => 'int'
	];

	protected $dates = [
		'email_verified_at'
	];

	protected $hidden = [
		'password',
		'remember_token'
	];

	protected $fillable = [
		'username',
		'password',
		'e_mail',
		'name',
		'surname',
		'avatar',
		'function',
		'active',
		'remember_token',
		'email_verified_at'
	];

	public function contacts()
	{
		return $this->hasMany(\App\Models\Contact::class, 'username');
	}

	public function invitations()
	{
		return $this->hasMany(\App\Models\Invitation::class, 'username');
	}

	public function messages()
	{
		return $this->hasMany(\App\Models\Message::class, 'to_username');
	}
}
