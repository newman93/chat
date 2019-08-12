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

        return true;
    }

    public function changeNameAndSurname(User $user, String $name, String $surname) {
        $user->setName($name);
        $user->setSurname($surname);

        $user->save();

        return true;
    }

    private function validateEMail(User $user, String $eMail) {
        return is_null($dbEMail = User::where('e_mail', '=', $eMail)->first());
    }

    public function changeEMail(User $user, String $eMail) {
        if ($this->validateEMail($user, $eMail)) {
            $user->setEMail($eMail);
            $user->save();

            return true;
        } else {
            return false;
        }
    }
}
