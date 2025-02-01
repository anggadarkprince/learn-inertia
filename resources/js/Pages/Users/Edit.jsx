import {Head, useForm} from '@inertiajs/react'
import {route} from "ziggy-js";
import App from "@/Layouts/App.jsx";
import Input from "@/Components/Input.jsx";
import Button from "@/Components/Button.jsx";
import ProgressBar from "@/Components/ProgressBar.jsx";
import FileInput from "@/Components/FileInput.jsx";

export default function Edit({user}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
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
    })

    function submit(e) {
        e.preventDefault();
        clearErrors();
        post(route('users.update', {user}));
    }

    return (
        <App>
            <Head title="Edit User" />
            <div className="rounded bg-white dark:bg-gray-900 p-4">
                <h1 className="text-lg font-medium mb-3">Edit user</h1>
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
        </App>
    )
}
