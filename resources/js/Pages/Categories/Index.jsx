import {Deferred, Head, Link, router, usePage} from '@inertiajs/react'
import {formatDate} from "date-fns";
import {route} from "ziggy-js";
import App from "@/Layouts/App.jsx";
import Pagination from "@/Components/Pagination.jsx";
import {Dropdown} from "@/Components/Dropdown.jsx";
import Icon from "@/Components/Icon.jsx";
import Button from "@/Components/Button.jsx";

export default function Index({categories}) {
    const handlePageChange = (url) => {
        if (!url) return;

        router.visit(url, {
            only: ['categories'], // Perform partial reload
            preserveState: true, // Keep component state
            preserveScroll: true, // Retain scroll position
        });
    };

    return (
        <App>
            <Head title="Categories" />
            <div className="rounded bg-white dark:bg-gray-900 p-5">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h1 className="text-lg font-medium">Categories</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">All category data</p>
                    </div>
                    <Button href={route('categories.create')} color="success">
                        Create
                    </Button>
                </div>
                <table className="w-full text-base">
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
                    <Deferred data="categories" fallback={
                        <tr>
                            <td colSpan="5" className="text-center py-2">
                                Loading...
                            </td>
                        </tr>
                    }>
                        <CategoryData categories={categories}/>
                    </Deferred>
                    </tbody>
                </table>
                <div className="mt-4 flex justify-center">
                    <Pagination links={categories?.links} onPageChange={handlePageChange}/>
                </div>
            </div>
        </App>
    )
}

const CategoryData = ({categories}) => {
    return categories?.data?.map((category, index) => (
        <tr key={category.id} className="border-b border-gray-200 dark:border-gray-600">
            <td className="px-1.5 py-1 text-center">{categories.from + index}</td>
            <td className="px-1.5 py-1">{category.category}</td>
            <td className="px-1.5 py-1">{category?.description || '-'}</td>
            <td className="px-1.5 py-1">{formatDate(category?.created_at, 'dd MMM yyyy HH:mm')}</td>
            <td className="px-1.5 py-1 text-center">
                <Dropdown>
                    <Dropdown.Toggle>
                        <Button>Action <Icon name="chevron-down" size="sm"/></Button>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href={route('categories.show', {category})} prefetch>
                            <Icon name="eye"/> View
                        </Dropdown.Item>
                        <Dropdown.Item href={route('categories.edit', {category})}>
                            <Icon name="pencil"/> Edit
                        </Dropdown.Item>
                        <Dropdown.Separator/>
                        <Dropdown.Item href={route('categories.destroy', {category})} method="delete" as="button">
                            <Icon name="trash"/> Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    ))
}
