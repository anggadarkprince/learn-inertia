<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function __construct(private readonly UserRepository $userRepository) {}

    public function create($data): User
    {
        if (($avatar = $data['avatar'] ?? '') instanceof UploadedFile) {
            $result = $avatar->store('avatars/' . date('Y/m'));
            $data['avatar'] = $result ?: null;
        }
        $user = DB::transaction(function () use ($data) {
            $user = $this->userRepository->create($data);

            if (isset($data['roles'])) {
                foreach ($data['roles'] as $branchId => $role) {
                    $user->roles()->attach($role, ['id_branch' => $branchId]);
                }
            }

            return $user;
        });

        event(new Registered($user));

        return $user;
    }

    public function update(User $user, $data): bool
    {
        if (($avatar = $data['avatar'] ?? '') instanceof UploadedFile) {
            $result = $avatar->store('avatars/' . date('Y/m'));
            $data['avatar'] = $result ?: $user->avatar;
        } else {
            unset($data['avatar']);
        }

        if (empty($data['password'])) {
            unset($data['password']);
        }

        return $this->userRepository->update($user, $data);
    }
}
