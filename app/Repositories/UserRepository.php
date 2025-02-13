<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Http\Request;

class UserRepository
{
    public function __construct(private readonly User $user)
    {
    }

    public function getAll()
    {
        return $this->user->all();
    }

    public function getAllPaginated(Request $request)
    {
        return $this->user->query()
            ->when($request->string('search')->toString(), function($query, $search) {
                $query
                    ->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('username', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate()
            ->withQueryString();
    }

    public function getByEmail($email)
    {
        return User::where('email', $email)->first();
    }

    public function getByUsername($email)
    {
        return User::where('username', $email)->first();
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(User $user, array $data): bool
    {
        return $user->fill($data)->save();
    }

    public function delete(User|int|string|array $user): bool
    {
        if ($user instanceof User) {
            return !!$user->delete();
        }

        return $this->user->destroy($user) > 0;
    }
}
