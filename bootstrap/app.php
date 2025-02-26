<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware
            ->redirectGuestsTo(fn (Request $request) => route('auth.login'))
            ->redirectUsersTo(fn (Request $request) => route('dashboard'))
            ->web(append: [
                HandleInertiaRequests::class,
            ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            return inertia('Errors/Error404', [
                'auth' => [
                    'user' => $request->user()
                        ? $request->user()->append('avatar_url')->only('id', 'name', 'email', 'avatar_url')
                        : null,
                ],
                'message' => str($e->getMessage())
                    ->replace('App\\Models\\', '')
                    ->replace('model', '')
                    ->replaceMatches('/\d+/', ''),
            ])
                ->toResponse($request)
                ->setStatusCode(404);
        });
    })->create();
