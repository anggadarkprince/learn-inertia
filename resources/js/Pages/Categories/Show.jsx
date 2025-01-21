import {Head} from '@inertiajs/react'
import App from "@/Layouts/App.jsx";
import {formatDate} from "date-fns";

export default function Show({category}) {
    return (
        <App>
            <Head title={category.category} />
            <div className="rounded bg-white dark:bg-gray-900 p-4">
                <h1 className="text-lg font-medium mb-3">View category</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-base">
                    <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="font-medium">Category</div>
                            <div className="col-span-3">{category.category}</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="font-medium">Description</div>
                            <div className="col-span-3">{category.description}</div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="font-medium">Created At</div>
                            <div className="col-span-3">{formatDate(category.created_at, 'dd MMM yyy HH:mm')}</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="font-medium">Updated At</div>
                            <div className="col-span-3">
                                {category?.updated_at ? formatDate(category?.updated_at, 'dd MMM yyy HH:mm') : '-'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
