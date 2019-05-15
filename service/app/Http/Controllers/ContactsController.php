<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\User;

class ContactsController extends Controller
{
    public function __construct() {
        $this->middleware('api');

    }

    public function contacts($username) {
        return      Contact::with('contact')->where('username', '=', $username)->get();
    }
}
