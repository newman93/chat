<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;


class SettingsServiceProvider
{
    public function changeAvatar(User $user, Request $requestAvatar) {
        $image = $requestAvatar->file('avatar');

        $filename = $image->getClientOriginalName();

        if (!file_exists(storage_path('app/public/img/avatars/'.$user->getUsername()))) {
            mkdir(storage_path('app/public/img/avatars/'.$user->getUsername()));
        }

        $imageResize = Image::make($image->getRealPath());
        $imageResize->resize(100,100);
        $imageResize->save(storage_path('app/public/img/avatars/'.$user->getUsername().'/' .$filename));

        $user->setAvatar($filename);

        $user->save();
    }

    public function changeNameAndSurname(User $user, String $name, String $surname) {
        $user->setName($name);
        $user->setSurname($surname);

        $user->save();
    }
}
