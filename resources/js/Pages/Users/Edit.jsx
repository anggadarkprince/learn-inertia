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
        .optional()
        .or(z.literal(""))
        .refine((val) => !val || (val && val.length >= 6), {
            message: "New password must be at least 6 characters",
        })
        .refine((val) => val === "" || val.length <= 40, {
            message: "Password must be less than 40 characters",
        })
        .refine((val) => val === "" || /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine((val) => val === "" || /[a-z]/.test(val), {
            message: "Password must contain at least one lowercase letter",
        })
        .refine((val) => val === "" || /\d/.test(val), {
            message: "Password must contain at least one number",
        })
        .refine((val) => val === "" || /[^a-zA-Z0-9]/.test(val), {
            message: "Password must contain at least one special character",
        }),
    password_confirmation: z.string().optional().or(z.literal("")),
    avatar: z.string().optional().nullable(),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
});

export default function Edit({user}) {
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
        _method: 'put',
        name: user.name,
        username: user.username,
        email: user.email,
        password: '',
        password_confirmation: '',
        avatar: '',
    });

    function submit(e) {
        e.preventDefault();
        const result = schema.safeParse(data);
        if (result.success) {
            clearErrors();
            post(route('users.update', {user}));
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
            <Head title={`Edit User ${user.name}`} />
            <div className="rounded bg-white dark:bg-gray-900 p-5">
                <h1 className="text-lg font-medium mb-3">Edit User</h1>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <Input
                        type="text"
                        label="Name"
                        placeholder="User full name"
                        name="name"
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
                            label="Change Password"
                            placeholder="New password"
                            name="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            disabled={processing}
                            error={errors.password}/>
                        <Input
                            type="password"
                            label="Confirm New Password"
                            placeholder="Repeat the password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            error={errors.password_confirmation}/>
                    </div>

                    <FileInput
                        label="Avatar"
                        placeholder={user.avatar || 'Pick user avatar'}
                        name="avatar"
                        selectedValue={user.avatar}
                        value={data.avatar}
                        onChange={e => setData('avatar', e.target.files[0])}
                        disabled={processing}
                        accept={'image/png, image/gif, image/jpeg'}
                        error={errors.avatar}/>
                    {progress && <ProgressBar value={progress.percentage}/>}

                    <div className="mt-4 text-end">
                        <Button type="submit" disabled={processing}>
                            Update User
                        </Button>
                    </div>
                </form>
            </div>
        </Main>
    )
}
