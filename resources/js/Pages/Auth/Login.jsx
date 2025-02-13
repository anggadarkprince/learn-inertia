import {Head, Link, router, usePage} from '@inertiajs/react'
import {route} from "ziggy-js";
import Auth from "@/Layouts/Auth.jsx";
import Alert from "@/Components/Alert.jsx";
import {useState} from "react";
import Button from "@/Components/Button.jsx";
import Input from "@/Components/Input.jsx";
import {z} from "zod";

const schema = z.object({
    username: z.string().trim().min(1, 'Username is required'),
    password: z.string().trim().min(1, 'Password is required'),
});

export default function Login() {
    const {flash, errors} = usePage().props;

    const currentMessage = flash.message || errors.message;
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const [validationError, setValidationError] = useState({username: '', password: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();

        const result = schema.safeParse(data);
        if (result.success) {
            setIsSubmitting(true);
            setValidationError({username: '', password: ''});
            router.post(route('auth.login'), data, {
                preserveScroll: true,
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        } else {
            const validationErrors = result.error.format();
            setValidationError({
                username: validationErrors?.username?._errors || "",
                password: validationErrors?.password?._errors || "",
            });
        }
    }

    return (
        <Auth>
            <Head>
                <title>Login</title>
                <meta name="description" content="Sign in to your account"/>
            </Head>
            <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Login
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to your account</p>
            </div>
            {(!isSubmitting && currentMessage) && (
                <Alert color={flash.status || errors.status} dismissible={true} key={`${currentMessage}-${Date.now()}`}>
                    {currentMessage}
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input
                    type="text"
                    label="Username"
                    placeholder="Username or email"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.username || validationError.username}/>
                <Input
                    type="password"
                    label="Password"
                    placeholder="Your password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.password || validationError.password}/>

                <div className="mt-3">
                    <Button type="submit" block disabled={isSubmitting}>
                        Log in
                    </Button>
                </div>
            </form>
            <p className="mt-3 text-center">
                <Link href={route('auth.register')}
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Create New Account
                </Link>
            </p>
        </Auth>
)
}
