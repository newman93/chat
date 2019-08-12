<?php

namespace App\Providers;

use App\Models\Contact;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Support\ServiceProvider;

class ContactsServiceProvider {

    public function getContacts(User $user) {
        return Contact::with('contact')->where('username', '=', $user->getId())->get();
    }

    public function getSentInvitations(User $user) {
        return Invitation::with('username', 'contact')->where('username', '=', $user->getId())->get();
    }

    public function getWaitingInvitations(User $user) {
        return Invitation::with('username', 'contact')->where('contact', '=', $user->getId())->get();
    }
}
