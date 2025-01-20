import { Head } from '@inertiajs/react'
import App from "../../Layouts/App.jsx";

export default function Welcome({ user }) {
    return (
        <App>
            <Head title="Welcome" />
            <h1 className={'text-xl font-medium text-gray-800 dark:text-gray-200'}>Welcome</h1>
            <p className={'text-base text-gray-800 dark:text-gray-200'}>
                Hello {user?.name}, welcome to your first Inertia app!
            </p>
        </App>
    )
}
