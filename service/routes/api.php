<?php

use Illuminate\Http\Request;

Route::group([

    'middleware' => 'api',

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::get('contacts/{usernameId}', 'ContactsController@contacts');
    Route::get('images/{username}/{image}', function ($username, $image)
    {
        $file = File::get(storage_path("app/public/img/avatars/$username/$image"));
        return response($file, 200)->header('Content-Type', 'image/jpeg');
    });
    Route::get('messages/from/{fromUsernameId}/to/{toUsernameId}/load', 'MessagesController@loadMessages');
});
