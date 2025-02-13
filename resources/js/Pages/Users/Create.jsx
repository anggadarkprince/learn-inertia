import {Head, useForm} from '@inertiajs/react'
import {route} from "ziggy-js";
import {z} from "zod";
import Main from "@/Layouts/Main.jsx";
import Input from "@/Components/Input.jsx";
import Button from "@/Components/Button.jsx";
import ProgressBar from "@/Components/ProgressBar.jsx";
import FileInput from "@/Components/FileInput.jsx";

const schema = z.object({
    name: z.string().trim()
        .min(1, 'Name is required')
        .max(50, 'Name must be less than 50 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .regex(/^[a-zA-Z0-9_.\-]+$/, 'Username can only contain letters, numbers, period, dash and underscores'),
    email: z.string()
        .email('Invalid email format')
        .max(100, 'Email must be less than 100 characters'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must be less than 40 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    password_confirmation: z.string(),
    avatar: z.string().optional().nullable(),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"], // Error message will be attached to password_confirmation field
});

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        setError,
        clearErrors,
        progress,
    } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar: '',
    });

    function submit(e) {
        e.preventDefault();
        const result = schema.safeParse(data);
        if (result.success) {
            post(route('users.store'));
            clearErrors();
        } else {
            const validationErrors = result.error.format();
            const parsedErrors = Object.keys(data).reduce((errors, property) => {
                errors[property] = validationErrors[property]?._errors || "";
                return errors;
            }, {});
            setError(parsedErrors);
        }
    }

    return (
        <Main>
            <Head title="Create User" />
            <div className="rounded bg-white dark:bg-gray-900 p-5">
                <h1 className="text-lg font-medium mb-3">Create New User</h1>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <Input
                        type="text"
                        label="Name"
                        placeholder="User full name"
                        name="category"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        disabled={processing}
                        error={errors.name}/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="text"
                            label="Username"
                            placeholder="Username"
                            name="username"
                            value={data.username}
                            onChange={e => setData('username', e.target.value)}
                            disabled={processing}
                            error={errors.username}/>
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Email address"
                            name="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            disabled={processing}
                            error={errors.email}/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="password"
                            label="Password"
                            placeholder="New password"
                            name="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            disabled={processing}
                            error={errors.password}/>
                        <Input
                            type="password"
                            label="Confirm Password"
                            placeholder="Repeat the password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            error={errors.password_confirmation}/>
                    </div>

                    <FileInput
                        label="Avatar"
                        placeholder="Pick user avatar"
                        name="avatar"
                        value={data.avatar}
                        onChange={e => setData('avatar', e.target.files[0])}
                        disabled={processing}
                        accept={'image/png, image/gif, image/jpeg'}
                        error={errors.avatar}/>
                    {progress && <ProgressBar value={progress.percentage}/>}

                    <div className="mt-4 text-end">
                        <Button type="submit" disabled={processing}>
                            Create User
                        </Button>
                    </div>
                </form>
            </div>
        </Main>
    )
}
