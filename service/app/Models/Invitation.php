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

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return int
     */
    public function getUsername(): int
    {
        return $this->username;
    }

    /**
     * @param int $username
     */
    public function setUsername(int $username): void
    {
        $this->username = $username;
    }

    /**
     * @return int
     */
    public function getContact(): int
    {
        return $this->contact;
    }

    /**
     * @param int $contact
     */
    public function setContact(int $contact): void
    {
        $this->contact = $contact;
    }


	public function username()
	{
		return $this->belongsTo(\App\Models\User::class, 'username');
	}

    public function contact()
    {
        return $this->belongsTo(\App\Models\User::class, 'contact');
    }
}
