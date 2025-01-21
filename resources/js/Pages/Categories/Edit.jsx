import {Head, useForm} from '@inertiajs/react'
import {route} from "ziggy-js";
import App from "@/Layouts/App.jsx";

export default function Edit({category}) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        clearErrors,
    } = useForm({
        category: category.category,
        description: category.description,
    });

    function submit(e) {
        e.preventDefault();
        clearErrors();
        put(route('categories.update', {category}));
    }

    return (
        <App>
            <Head title="Create Category" />
            <div className="rounded bg-white dark:bg-gray-900 p-4">
                <h1 className="text-lg font-medium mb-3">Edit category</h1>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="category" className="mb-1 block">Category</label>
                        <input
                            type="text"
                            className="px-2 py-1 rounded w-full"
                            name="category"
                            id="category"
                            placeholder="Category title"
                            disabled={processing}
                            value={data.category}
                            onChange={e => setData('category', e.target.value)}
                        />
                        {errors.category && <p className="text-red-500">{errors.category}</p>}
                    </div>
                    <div>
                        <label htmlFor="description" className="mb-1 block">Category</label>
                        <textarea
                            className="px-2 py-1 rounded w-full"
                            name="description"
                            id="description"
                            placeholder="Category description"
                            disabled={processing}
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        ></textarea>
                        {errors.description && <p className="text-red-500">{errors.description}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                            disabled={processing}
                        >
                            Update Category
                        </button>
                    </div>
                </form>
            </div>
        </App>
    )
}
