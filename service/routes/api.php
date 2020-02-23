<?php

use Illuminate\Http\Request;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    //todo: detect user from token & move contact to post request
    /* ------------------- MessagesController ------------------- */
    Route::get('messages/from/{fromUsernameId}/to/{toUsernameId}/load', 'MessagesController@loadMessages');
    Route::post('messages/from/{fromUsernameId}/to/{toUsernameId}/send', 'MessagesController@sendMessage');
    /* ------------------- SettingsController ------------------- */
    Route::post('settings/user/{user}/change/avatar', 'SettingsController@changeAvatar');
    Route::post('settings/user/{user}/change/nameAndSurname', 'SettingsController@changeNameAndSurname');
    Route::post('settings/user/{user}/change/email', 'SettingsController@changeEMail');
    Route::post('settings/user/{user}/change/password', 'SettingsController@changePassword');
    /* ------------------- ContactsController ------------------- */
    Route::get('contacts/user/{user}/get', 'ContactsController@getContacts');
    Route::get('contacts/user/{user}/invitations/sent', 'ContactsController@getSentInvitations');
    Route::get('contacts/user/{user}/invitations/waiting', 'ContactsController@getWaitingInvitations');
    Route::post('contacts/user/{user}/contact/search', 'ContactsController@searchContact');
    Route::post('contacts/user/{user}/user/search', 'ContactsController@searchUser');
    Route::get('contacts/user/{user}/contact/{contact}/invite', 'ContactsController@inviteContact');
    Route::get('contacts/user/{user}/contact/{contact}/add', 'ContactsController@addContact');
    Route::get('contacts/user/{user}/contact/{contact}/cancel', 'ContactsController@cancelContact');
});

Route::get('permissionDenied', function() {
    return response()->json(['error' => 'Błędny token'], 401);
})->name('wrongToken');


Route::get('images/username/{username}/avatar/{image}', function ($username, $image)
{
    $file = File::get(storage_path("app/public/img/avatars/$username/$image"));
    return response($file, 200)->header('Content-Type', 'image/jpeg');
});


