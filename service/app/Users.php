<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Builder;
use Intervention\Image\ImageManagerStatic as Image;


class Users extends Authenticatable implements JWTSubject
{
    use Notifiable;

    public function contacts(){
        return $this->has_many('\App\Contacts','contacts');

    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'password', 'e_mail', 'name', 'surname', 'avatar', 'function', 'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [

    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public static function create(array $attributes = [])
    {
        $attributes = $attributes[0];

       if ($attributes->hasFile('avatar')) {
            $image       = $attributes->file('avatar');
            $filename    = $image->getClientOriginalName();
            mkdir(storage_path('app/public/img/avatars/'.$attributes['username']));
            $image_resize = Image::make($image->getRealPath());
            $image_resize->resize(100, 100);
            $image_resize->save(storage_path('app/public/img/avatars/'.$attributes['username'].'/' .$filename));
        }

       $inputs = [];

       foreach ($attributes->all() as $key=>$value) {
           if ($key == 'avatar') {
               $inputs[$key] = $filename;
           } else if ($key != 'avatar_name') {
               $inputs[$key] = $value;
           }
       }

       $inputs['function'] = 1;

       if (!(array_key_exists('avatar', $inputs))) {
           $inputs['avatar'] = 'assets/img/avatars/avatar.png';
       }

        $model = static::query()->create($inputs);

        return $model;
    }
}
