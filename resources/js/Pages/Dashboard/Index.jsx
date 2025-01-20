import {Head} from '@inertiajs/react'
import App from "../../Layouts/App.jsx";

export default function Index({ user }) {
    return (
        <App>
            <Head title="Dashboard" />
            <h1 className={'text-xl font-medium text-gray-800 dark:text-gray-200'}>Welcome</h1>
        </App>
    )
}
