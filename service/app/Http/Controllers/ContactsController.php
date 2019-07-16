<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\User;

class ContactsController extends Controller
{
    public function __construct() {
        $this->middleware('api');

    }

    public function contacts($usernameId) {
        return      Contact::with('contact')->where('username', '=', $usernameId)->get();
    }
}
