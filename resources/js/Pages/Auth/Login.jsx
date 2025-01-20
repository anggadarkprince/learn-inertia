import {Head, Link} from '@inertiajs/react'
import {route} from "ziggy-js";
import Auth from "@/Layouts/Auth.jsx";

export default function Login() {
    return (
        <Auth>
            <Head>
                <title>Login</title>
                <meta name="description" content="Sign in to your account" />
            </Head>
            <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Login
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to your account</p>
            </div>
            <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">Username</span>
                <input
                    className="block w-full border px-3 py-2 rounded mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:ring-purple-700 focus:ring-opacity-20 dark:text-gray-300"
                    placeholder="Username or email" required/>
            </label>
            <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">Password</span>
                <input
                    className="block w-full border px-3 py-2 rounded mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:ring-purple-700 focus:ring-opacity-20 dark:text-gray-300"
                    placeholder="Input password" type="password" required/>
            </label>

            <button type="submit"
                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Log in
            </button>

            <p className="mt-3 text-center">
                <Link href={route('auth.register')} className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Create New Account
                </Link>
            </p>
        </Auth>
    )
}
