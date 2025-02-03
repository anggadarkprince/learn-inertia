import {Head} from '@inertiajs/react'
import App from "../../Layouts/App.jsx";
import {route} from "ziggy-js";

export default function Index({ user }) {
    return (
        <App>
            <Head title="Dashboard"/>
            <div className="rounded bg-white dark:bg-gray-900 p-5">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h1 className="text-lg font-medium">Welcome</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard data summary</p>
                    </div>
                </div>
            </div>
        </App>
    )
}
