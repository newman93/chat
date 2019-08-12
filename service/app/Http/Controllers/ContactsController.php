<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\User;
use App\Providers\ContactsServiceProvider;

class ContactsController extends Controller
{
    public function __construct() {
        $this->middleware('api');

    }

    public function getContacts(User $user, ContactsServiceProvider $contactsService) {
        return  response($contactsService->getContacts($user), 200);
    }

    public function getSentInvitations(User $user, ContactsServiceProvider $contactsService) {
        return response($contactsService->getSentInvitations($user), 200);
    }

    public function getWaitingInvitations(User $user, ContactsServiceProvider $contactsService) {
        return response($contactsService->getWaitingInvitations($user), 200);
    }
}
