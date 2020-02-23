<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 15 May 2019 19:57:24 +0000.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

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
 * 
 * @property \Illuminate\Database\Eloquent\Collection $contacts
 * @property \Illuminate\Database\Eloquent\Collection $invitations
 * @property \Illuminate\Database\Eloquent\Collection $messages
 *
 * @package App\Models
 */
class User extends Authenticatable implements JWTSubject
//    , AuthenticatableContract, CanResetPasswordContract
{
    use Notifiable;
//    Authenticatable, CanResetPassword,


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

	protected $table = 'users';

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
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param string $password
     */
    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    /**
     * @return string
     */
    public function getEMail(): string
    {
        return $this->e_mail;
    }

    /**
     * @param string $e_mail
     */
    public function setEMail(string $e_mail): void
    {
        $this->e_mail = $e_mail;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getSurname(): string
    {
        return $this->surname;
    }

    /**
     * @param string $surname
     */
    public function setSurname(string $surname): void
    {
        $this->surname = $surname;
    }

    /**
     * @return string
     */
    public function getAvatar(): string
    {
        return $this->avatar;
    }

    /**
     * @param string $avatar
     */
    public function setAvatar(string $avatar): void
    {
        $this->avatar = $avatar;
    }

    /**
     * @return string
     */
    public function getFunction(): string
    {
        return $this->function;
    }

    /**
     * @param string $function
     */
    public function setFunction(string $function): void
    {
        $this->function = $function;
    }

    /**
     * @return int
     */
    public function getActive(): int
    {
        return $this->active;
    }

    /**
     * @param int $active
     */
    public function setActive(int $active): void
    {
        $this->active = $active;
    }

    /**
     * @return string
     */
    public function getRememberToken(): string
    {
        return $this->remember_token;
    }

    /**
     * @param string $remember_token
     */
    public function setRememberToken($remember_token): void
    {
        $this->remember_token = $remember_token;
    }

	public function contactsUsername()
	{
		return $this->hasMany(\App\Models\Contact::class, 'username');
	}

	public function contactsContact() {
        return $this->hasMany(\App\Models\Contact::class, 'contact');
    }

	public function invitationsUsername()
	{
		return $this->hasMany(\App\Models\Invitation::class, 'username');
	}

	public function invitationsContact()
    {
        return $this->hasMany(\App\Models\Invitation::class, 'contact');
    }

	public function MessageToUsername()
	{
		return $this->hasMany(\App\Models\Message::class, 'to_username');
	}

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }


}
