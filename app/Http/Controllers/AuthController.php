<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\AuthService;
use App\Services\UserService;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService) {}

    public function showLoginForm(): Response
    {
        return inertia('Auth/Login');
    }


    /**
     * Handle a login request to the application.
     */
    public function login(LoginRequest $request): RedirectResponse
    {
        $username = $request->post('username');
        $password = $request->post('password');
        $remember = $request->boolean('remember');

        try {
            if ($this->authService->authenticate($username, $password, $remember)) {
                $request->session()->regenerate();

                return redirect()->intended($request->get('redirect', '/'));
            }
        } catch (ModelNotFoundException $e) {
            return back()->withInput()->withErrors([
                'status' => 'danger',
                'message' => __('User is not found'),
            ]);
        } catch (AuthenticationException $e) {
            return back()->withInput()->withErrors([
                'status' => 'danger',
                'message' => $e->getMessage(),
            ]);
        }

        return back()->withInput()->withErrors([
            'status' => 'danger',
            'message' => __('Cannot authenticate your account'),
        ]);
    }

    public function showRegistrationForm(): Response
    {
        return inertia('Auth/Register');
    }

    public function register(RegisterRequest $request, UserService $userService): RedirectResponse
    {
        try {
            $userService->create($request->validated());

            return redirect()->route('auth.login')->with([
                'status' => 'success',
                'message' => __('You are successfully registered, waiting for approval!'),
            ]);
        } catch (Exception $e) {
            return back()->withInput()->withErrors([
                'status' => 'danger',
                'message' => $e->getMessage(),
            ]);
        }
    }
}
