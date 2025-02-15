<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{{ config('app.name') }} - @yield('title', 'Home')</title>
</head>
<body>
<div class="text-gray-800 dark:text-gray-200">
    <div class="flex flex-col items-center justify-center py-5 min-h-screen bg-gray-100 dark:bg-gray-900 rounded">
        <h1 class="text-5xl font-bold text-rose-500">500</h1>
        <div class="text-center mb-3">
            <p class="text-lg text-gray-700 dark:text-gray-500">
                Oops! Server Error.
            </p>
            <p class="text-sm text-gray-400 dark:text-gray-600">
                Try again later or contact our support
            </p>
        </div>
        <a class="px-4 py-2 text-base rounded-lg text-sm inline-flex justify-center items-center gap-2 font-medium leading-5 text-center transition-colors duration-150 border border-transparent focus:outline-none inline-block text-white bg-purple-600 active:bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400" href="http://localhost:8000/">
            ← Go Home
        </a>
    </div>
</div>

@vite(['resources/css/app.css'])
</body>
</html>
