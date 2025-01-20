<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function __construct(private readonly UserRepository $userRepository) {}

    /**
     * @throws AuthenticationException
     */
    public function authenticate(string $username, string $password, bool $remember = false): bool
    {
        if (filter_var($username, FILTER_VALIDATE_EMAIL)) {
            $usernameField = 'email';
            $user = $this->userRepository->getByEmail($username);
        } else {
            $usernameField = 'username';
            $user = $this->userRepository->getByUsername($username);
        }

        if (empty($user)) {
            $notFound = new ModelNotFoundException;
            $notFound->setModel(User::class, [$username]);
            throw $notFound;
        }

        $condition = [
            $usernameField => $username,
            'password' => $password,
        ];
        $result = Auth::attempt($condition, $remember);

        if (!$result) {
            throw new AuthenticationException('Wrong authentication credentials');
        }

        return $result;
    }

    public function logout(Request $request): void
    {
        Auth::logout();

        if ($request->hasSession()) {
            $request->session()->invalidate();

            $request->session()->regenerateToken();
        }
    }
}
