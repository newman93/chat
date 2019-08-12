<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\User;
use App\Providers\ContactsServiceProvider;
use Illuminate\Http\Request;

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

    public function searchContact(User $user, Request $request, ContactsServiceProvider $contactsService) {
        return response($contactsService->searchContact($user, $request->get('contact')), 200);
    }

    public function searchUser(User $user, Request $request, ContactsServiceProvider $contactsService) {
        return response($contactsService->searchUser($user, $request->get('user')), 200);
    }
}
