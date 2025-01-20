<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function getByEmail($email)
    {
        return User::where('email', $email)->first();
    }

    public function getByUsername($email)
    {
        return User::where('username', $email)->first();
    }

    public function create(array $data): mixed
    {
        return User::create($data);
    }

    public function update(User $user, array $data): bool
    {
        return $user->fill($data)->save();
    }
}
