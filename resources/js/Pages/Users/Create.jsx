import {Head, useForm} from '@inertiajs/react'
import {route} from "ziggy-js";
import App from "@/Layouts/App.jsx";
import Input from "@/Components/Input.jsx";
import Button from "@/Components/Button.jsx";
import ProgressBar from "@/Components/ProgressBar.jsx";
import FileInput from "@/Components/FileInput.jsx";

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
        progress,
    } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar: '',
    })

    function submit(e) {
        e.preventDefault();
        clearErrors();
        post(route('users.store'));
    }

    return (
        <App>
            <Head title="Create User" />
            <div className="rounded bg-white dark:bg-gray-900 p-4">
                <h1 className="text-lg font-medium mb-3">Create new user</h1>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <Input
                        type="text"
                        label="Name"
                        placeholder="User full name"
                        name="category"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        disabled={processing}
                        error={errors.name}
                        required/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="text"
                            label="Username"
                            placeholder="Username"
                            name="username"
                            value={data.username}
                            onChange={e => setData('username', e.target.value)}
                            disabled={processing}
                            error={errors.username}
                            required/>
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Email address"
                            name="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            disabled={processing}
                            error={errors.email}
                            required/>
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
                            error={errors.password}
                            required/>
                        <Input
                            type="password"
                            label="Confirm Password"
                            placeholder="Repeat the password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            error={errors.password_confirmation}
                            required/>
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
        </App>
    )
}
