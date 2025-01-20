<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $user = \App\Models\User::find(1);
    return \Inertia\Inertia::render('Users/Show', [
        'user' => $user
    ]);
});
