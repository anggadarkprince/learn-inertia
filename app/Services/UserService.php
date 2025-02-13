<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;

class UserService
{
    public function __construct(private readonly UserRepository $userRepository) {}

    public function getAll()
    {
        return $this->userRepository->getAll();
    }

    public function getAllPaginated(Request $request)
    {
        return $this->userRepository->getAllPaginated($request);
    }

    public function create($data): User
    {
        if (($avatar = $data['avatar'] ?? '') instanceof UploadedFile) {
            $result = $avatar->store('avatars/' . date('Y/m'));
            $data['avatar'] = $result ?: null;
        }
        $user = $this->userRepository->create($data);

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

        Cache::delete('auth.user');

        return $this->userRepository->update($user, $data);
    }

    public function delete($user): bool
    {
        return $this->userRepository->delete($user);
    }
}
