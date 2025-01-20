import {Head, Link, router, useForm} from '@inertiajs/react'
import {route} from "ziggy-js";
import Auth from "@/Layouts/Auth.jsx";
import {useState} from "react";
import FormError from "@/Components/ErrorText.jsx";

export default function Register() {
    const {
        data,
        setData,
        post,
        processing,
        errors
    } = useForm({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        agreement: '',
    })

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value
        console.log(key, value)
        setData(key, value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        post(route('auth.register'))
    }

    return (
        <Auth>
            <Head>
                <title>Register</title>
                <meta name="description" content="Create new account"/>
            </Head>
            <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Register
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Create new account</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                    <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-400">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={handleChange}
                        className="block w-full border px-3 py-2 rounded mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:ring-purple-700 focus:ring-opacity-20 dark:text-gray-300"
                        placeholder="Name"
                        id="name"
                        name="name"
                        required/>
                    {errors.name && <FormError>{errors.name}</FormError>}
                </div>

                <div>
                    <label htmlFor="username" className="text-sm text-gray-700 dark:text-gray-400">Username</label>
                    <input
                        type="text"
                        value={data.username}
                        onChange={handleChange}
                        className="block w-full border px-3 py-2 rounded mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:ring-purple-700 focus:ring-opacity-20 dark:text-gray-300"
                        placeholder="Username"
                        id="username"
                        name="username"
                        required/>
                    {errors.username && <FormError>{errors.username}</FormError>}
                </div>

                <div>
                    <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-400">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={handleChange}
                        className="block w-full border px-3 py-2 rounded mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:ring-purple-700 focus:ring-opacity-20 dark:text-gray-300"
                        placeholder="Email address"
                        id="email"
                        name="email"
                        required/>
                    {errors.email && <FormError>{errors.email}</FormError>}
                </div>

                <div>
                    <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-400">Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={handleChange}
                        className="block w-full border px-3 py-2 rounded mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:ring-purple-700 focus:ring-opacity-20 dark:text-gray-300"
                        placeholder="Password"
                        id="password"
                        name="password"
                        required/>
                    {errors.password && <FormError>{errors.password}</FormError>}
                </div>

                <div>
                    <label className="text-sm text-gray-700 dark:text-gray-400">Confirm Password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={handleChange}
                        className="block w-full border px-3 py-2 rounded mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:ring-purple-700 focus:ring-opacity-20 dark:text-gray-300"
                        placeholder="Confirm password"
                        id="password_confirmation"
                        name="password_confirmation"
                        required/>
                    {errors.password_confirmation && <FormError>{errors.password_confirmation}</FormError>}
                </div>

                <div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            value={1}
                            onChange={(e) => setData('agreement', e.target.checked)}
                            name="agreement"
                            id="agreement"
                            className="border-0"
                            required/>
                        <label htmlFor="agreement" className="text-sm text-gray-700 dark:text-gray-400 ms-2">
                            I agree with terms & conditions
                        </label>
                    </div>
                    {errors.agreement && <FormError>{errors.agreement}</FormError>}
                </div>

                <button type="submit"
                        className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                        disabled={processing}>
                    Create account
                </button>
            </form>

            <p className="mt-3 text-center">
                <Link href={route('auth.login')}
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Already have an account? Login
                </Link>
            </p>
        </Auth>
    )
}
