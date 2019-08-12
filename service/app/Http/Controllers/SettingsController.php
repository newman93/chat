<?php
/**
 * Created by PhpStorm.
 * User: adrian
 * Date: 16.07.19
 * Time: 20:36
 */

namespace App\Http\Controllers;


use App\Models\User;
use App\Providers\SettingsServiceProvider;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function __construct() {
        $this->middleware('api');
    }

    public function changeAvatar(User $user, Request $request, SettingsServiceProvider $settingsService) {
        return  $settingsService->changeAvatar($user, $request);
    }
}
