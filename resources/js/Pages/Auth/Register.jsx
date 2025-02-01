import {Head, Link, useForm, usePage} from '@inertiajs/react'
import {route} from "ziggy-js";
import Auth from "@/Layouts/Auth.jsx";
import FormError from "@/Components/ErrorText.jsx";
import Alert from "@/Components/Alert.jsx";
import Button from "@/Components/Button.jsx";
import Input from "@/Components/Input.jsx";

export default function Register() {
    const {flash} = usePage().props;
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        agreement: '',
    });
    const currentMessage = flash.message || errors.message;

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value
        setData(key, value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        post(route('auth.register'), {
            onSuccess: () => reset(),
        });
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

            {(!processing && currentMessage) && (
                <Alert color={flash.status || errors.status} dismissible={true} key={`${currentMessage}-${Date.now()}`}>
                    {currentMessage}
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input
                    type="text"
                    label="Name"
                    placeholder="Your full name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    disabled={processing}
                    error={errors.name}
                    required/>

                <Input
                    type="text"
                    label="Username"
                    placeholder="Username"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                    disabled={processing}
                    error={errors.username}
                    required/>

                <Input
                    type="email"
                    label="Email"
                    placeholder="Email address"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    disabled={processing}
                    error={errors.email}
                    required/>

                <Input
                    type="password"
                    label="Password"
                    placeholder="Create new password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    disabled={processing}
                    error={errors.password}
                    required/>

                <Input
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={handleChange}
                    disabled={processing}
                    error={errors.password_confirmation}
                    required/>

                <div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            value={1}
                            onChange={(e) => setData('agreement', e.target.checked)}
                            name="agreement"
                            id="agreement"
                            disabled={processing}
                            required/>
                        <label htmlFor="agreement" className="text-sm text-gray-700 dark:text-gray-400 ms-2">
                            I agree with terms & conditions
                        </label>
                    </div>
                    {errors.agreement && <FormError>{errors.agreement}</FormError>}
                </div>

                <div className="mt-3">
                    <Button type="submit" block disabled={processing}>
                        Create account
                    </Button>
                </div>
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
