<?php

namespace App\Providers;

use App\Models\Contact;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;

class ContactsServiceProvider {

    public function getContacts(User $user) {
        return DB::table('users')
                    ->join('contacts', 'contacts.contact', 'users.id' )
                    ->where('contacts.username', '=', $user->getId())
                    ->select('users.id', 'users.username', 'users.e_mail', 'users.name', 'users.surname')
                    ->addSelect('users.avatar', 'users.function', 'users.active')
                    ->get();
    }

    public function getSentInvitations(User $user) {
        return Invitation::with('username', 'contact')->where('username', '=', $user->getId())->get();
    }

    public function getWaitingInvitations(User $user) {
        return Invitation::with('username', 'contact')->where('contact', '=', $user->getId())->get();
    }

    public function searchUser(User $user, string $search) {
        $parsedSearch = explode(" ", $search);

        if (count($parsedSearch) > 1) {
            return User::with(['contactsContact' => function ($query) use ($user) {
                    return $query->where('id', '=', $user->getId());
                },
                'invitationsContact' => function ($query) use ($user) {
                    return $query->where('id', '=', $user->getId());
                },
                'invitationsUsername' => function ($query) use ($user) {
                    return $query->where('id', '=', $user->getId());
                }])
                ->where('id', '!=', $user->getId())
                ->where(function ($query) use ($parsedSearch) {
                    return $query->where(function ($subQuery) use ($parsedSearch) {
                        return $subQuery->where('name', '=', $parsedSearch[0])
                                    -> where('surname', '=', $parsedSearch[1]);
                    })
                    ->orWhere(function ($subQuery) use ($parsedSearch) {
                        return $subQuery->where('name', '=', $parsedSearch[1])
                                    ->where('surname', '=', $parsedSearch[0]);
                    });

                })
                ->get();
        } else {
            return User::with(['contactsContact' => function ($query) use ($user) {
                    return $query->where('id', '=', $user->getId());
                },
                'invitationsContact' => function ($query) use ($user) {
                    return $query->where('id', '=', $user->getId());
                },
                'invitationsUsername' => function ($query) use ($user) {
                    return $query->where('id', '=', $user->getId());
                }])
                ->where('id', '!=', $user->getId())
                ->where(function ($query) use ($parsedSearch) {
                    return $query->where(function ($subQuery) use ($parsedSearch) {
                        return $subQuery->where('name', '=', $parsedSearch[0]);
                    })
                    ->orWhere(function ($subQuery) use ($parsedSearch) {
                        return $subQuery->where('surname', '=', $parsedSearch[0]);
                    });

                })
                ->get();
        }
    }

    public function searchContact(User $user, string $search) {
        $parsedSearch = explode(" ", $search);

        if (count($parsedSearch) > 1) {
            return DB::table('users')
                ->join('contacts', 'contacts.contact', 'users.id')
                ->where('contacts.username', '=', $user->getId())
                ->where(function ($query) use ($parsedSearch) {
                    return $query->where(function ($subQuery) use ($parsedSearch) {
                        $subQuery->where('users.name', '=', $parsedSearch[0])
                            ->where('users.surname', '=', $parsedSearch[1]);
                    })
                    ->orWhere(function ($subQuery) use ($parsedSearch) {
                        $subQuery->where('users.name', '=', $parsedSearch[1])
                            ->where('users.surname', '=', $parsedSearch[0]);
                    });
                })
                ->select('users.id', 'users.username', 'users.e_mail', 'users.name', 'users.surname')
                ->addSelect('users.avatar', 'users.function', 'users.active')
                ->get();
        } else {
            return DB::table('users')
                ->join('contacts', 'contacts.contact', 'users.id')
                ->where('contacts.username', '=', $user->getId())
                ->where(function ($query) use ($parsedSearch) {
                    return $query->where('users.name', '=', $parsedSearch[0])
                                ->orWhere('users.surname', '=', $parsedSearch[0]);
                })
                ->select('users.id', 'users.username', 'users.e_mail', 'users.name', 'users.surname')
                ->addSelect('users.avatar', 'users.function', 'users.active')
                ->get();
        }
    }

    public function inviteContact(User $user, User $contact) {
        $invitation = new Invitation();
        $invitation->setUsername($user->getId());
        $invitation->setContact($contact->getId());

        $invitation->save();

        return true;
    }

    public function addContact(User $user, User $contact) {
        Invitation::where('username', '=', $contact->getId())
                    ->where('contact', '=', $user->getId())
                        ->delete();

        $contactRelation1 = new Contact();
        $contactRelation1->setContact($user->getId());
        $contactRelation1->setUsername($contact->getId());
        $contactRelation1->save();

        $contactRelation2 = new Contact();
        $contactRelation2->setContact($contact->getId());
        $contactRelation2->setUsername($user->getId());
        $contactRelation2->save();

        return true;
    }

    public function cancelContact(User $user, User $contact) {
        Invitation::where('username', '=', $contact->getId())
                    ->where('contact', '=', $user->getId())
                        ->delete();
        return true;
    }
}
