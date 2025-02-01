<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Inertia\ResponseFactory;

class UserController extends Controller
{
    public function __construct(private readonly UserService $userService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response|ResponseFactory
    {
        return inertia("Users/Index", [
            'title' => 'Users',
            'users' => Inertia::defer(fn () => $this->userService->getAllPaginated($request))
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response|ResponseFactory
    {
        return inertia("Users/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        try {
            $user = $this->userService->create($request->validated());

            return to_route('users.index')->with([
                'status' => 'success',
                'message' => __('User :user successfully created', ['user' => $user->name]),
            ]);
        } catch (Exception $e) {
            return back()->withInput()->withErrors(['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): Response|ResponseFactory
    {
        $user->append(['avatar_url']);

        return inertia("Users/Show", compact("user"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response|ResponseFactory
    {
        return inertia("Users/Edit", compact("user"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        try {
            $this->userService->update($user, $request->validated());

            return to_route('users.index')->with([
                'status' => 'success',
                'message' => __('User :user successfully updated', ['user' => $user->name]),
            ]);
        } catch (Exception $e) {
            return back()->withInput()->withErrors(['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        try {
            $this->userService->delete($user);

            return back()->with([
                'status' => 'success',
                'message' => __('User :user successfully deleted', ['user' => $user->name]),
            ]);
        } catch (Exception $e) {
            return back()->withErrors(['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }
}
