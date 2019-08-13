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
    public function getFromUsername(): int
    {
        return $this->from_username;
    }

    /**
     * @param int $from_username
     */
    public function setFromUsername(int $from_username): void
    {
        $this->from_username = $from_username;
    }

    /**
     * @return int
     */
    public function getToUsername(): int
    {
        return $this->to_username;
    }

    /**
     * @param int $to_username
     */
    public function setToUsername(int $to_username): void
    {
        $this->to_username = $to_username;
    }

    /**
     * @return string
     */
    public function getMessage(): string
    {
        return $this->message;
    }

    /**
     * @param string $message
     */
    public function setMessage(string $message): void
    {
        $this->message = $message;
    }

    /**
     * @return int
     */
    public function getToRead(): int
    {
        return $this->to_read;
    }

    /**
     * @param int $to_read
     */
    public function setToRead(int $to_read): void
    {
        $this->to_read = $to_read;
    }

    /**
     * @return \Carbon\Carbon
     */
    public function getDate(): \Carbon\Carbon
    {
        return $this->date;
    }

    /**
     * @param \Carbon\Carbon $date
     */
    public function setDate(\Carbon\Carbon $date): void
    {
        $this->date = $date;
    }

	public function fromUsername()
	{
		return $this->belongsTo(\App\Models\User::class, 'from_username');
	}

	public function toUsername()
    {
        return $this->belongsTo(\App\Models\User::class, 'to_username');
    }
}
