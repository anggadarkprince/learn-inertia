import {Head, Link, usePage} from '@inertiajs/react'
import {formatDate} from "date-fns";
import {route} from "ziggy-js";
import App from "@/Layouts/App.jsx";

export default function Index({categories}) {
    const { props } = usePage();
    const { status, message } = props.flash || {};
    console.log(status, message);
    return (
        <App>
            <Head title="Categories" />
            <div className="rounded bg-white dark:bg-gray-900 p-4">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h1 className="text-lg font-medium">Categories</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">All category data</p>
                    </div>
                    <Link href={route('categories.create')}
                          className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                        Create
                    </Link>
                </div>
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="px-1.5 py-1">No</th>
                        <th className="px-1.5 py-1 text-start">Category</th>
                        <th className="px-1.5 py-1 text-start">Description</th>
                        <th className="px-1.5 py-1 text-start">Created At</th>
                        <th className="px-1.5 py-1">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.data.map((category, index) => (
                        <tr key={category.id} className="border-b border-gray-200 dark:border-gray-600">
                            <td className="px-1.5 py-1 text-center">{categories.from + index}</td>
                            <td className="px-1.5 py-1">{category.category}</td>
                            <td className="px-1.5 py-1">{category?.description || '-'}</td>
                            <td className="px-1.5 py-1">{formatDate(category?.created_at, 'dd MMM yyyy HH:mm')}</td>
                            <td className="px-1.5 py-1">
                                <Link href={route('categories.edit', {category})}>
                                    Edit
                                </Link>
                                |
                                <Link href={route('categories.destroy', {category})} method="delete" as="button">
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </App>
    )
}
