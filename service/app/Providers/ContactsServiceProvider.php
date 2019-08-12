<?php

namespace App\Providers;

use App\Models\Contact;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Support\Facades\DB;
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

    public function searchContact(User $user, string $contact) {
        $parsedSearch = explode(" ", $contact);

        if (count($parsedSearch) > 1) {
            return Contact::with(['contact' => function ($query) use ($parsedSearch) {
                        return $query->where(function ($subQuery) use ($parsedSearch) {
                            return $subQuery->where('name', '=', $parsedSearch[0])
                                        ->where('surname', '=', $parsedSearch[1]);
                        })
                        ->orWhere(function ($subQuery) use ($parsedSearch) {
                            return $subQuery->where('name', '=', $parsedSearch[1])
                                        ->where('surname', '=', $parsedSearch[0]);
                        });
                    }])
                    ->where('username', '=', $user->getId())
                    ->has('contact')
                    ->get();
        } else {
            return Contact::with(['contact' => function ($query) use ($parsedSearch) {
                return $query->where(function ($subQuery) use ($parsedSearch) {
                    return $subQuery->where('name', '=', $parsedSearch[0]);
                    })
                    ->orWhere(function ($subQuery) use ($parsedSearch) {
                        return $subQuery->where('surname', '=', $parsedSearch[0]);
                    });
                 }])
                ->where('username', '=', $user->getId())
                ->get();
        }
    }

//    //todo: to fix
//    public function searchContact(User $user, string $contact) {
//        $search = explode(" ", $contact);
//
//        if (count($search) > 1) {
//            return Contact::with(['contact' => function ($query) use ($search) {
//                return  $query->where(function ($subQuery) use ($search) {
//                    return $subQuery->where('name', '=', $search[0])
//                        ->where('surname', '=', $search[1]);
//
//                })
//                    ->orWhere(function ($subQuery) use ($search) {
//                        return $subQuery->where('name', '=', $search[1])
//                            ->where('surname', '=', $search[0]);
//                    });
//                }])
//                ->where('username', '=', $user->getId())->get();
//        } else {
//            return Contact::with('contact')->where('username', '=', $user->getId())
//                ->where(function ($query) use ($search) {
//                    return $query->where('name', '=', $search[0])
//                            ->orWhere('surname', '=', $search[0]);
//                })->get();
//        }
//    }

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

//    public function searchUser(User $user, string $search) {
//        $parsedSearch = explode(" ", $search);
//
//        if (count($parsedSearch) > 1) {
//            return DB::table('users')
//                ->leftJoin('contacts', 'contacts.id', '=', 'users.id')
//                ->leftJoin('invitations', function ($join) use ($parsedSearch, $user) {
//                    return $join->on(function ($on) use ($parsedSearch, $user) {
//                                return $on->on('invitations.username', '=', $user->getId())
//                                            ->on('invitations.contact', '=', 'users.id');
//                        })
//                        ->orOn(function ($on) use ($parsedSearch, $user) {
//                            return $on->on('invitations.contact', '=', $user->getId())
//                                        ->on('invitations.username', '=', 'users.username');
//                        });
//                    })
//                ->where('users.username', '!=', $user->getId())
//                ->where(function ($query) use ($parsedSearch, $user) {
//                    return $query->where(function ($subQuery) use ($parsedSearch, $user) {
//                        return $subQuery->where('users.name', '=', $parsedSearch[0])
//                                    ->where('users.surname', '=', $parsedSearch[1]);
//                    })
//                    ->orWhere(function ($subQuery) use ($parsedSearch, $user) {
//                        return $subQuery->where('users.name', '=', $parsedSearch[1])
//                                    ->where('users.surname', '=', $parsedSearch[0]);
//                    });
//                })
//                ->get();
//
//        } else {
//
//        }
//    }


}
