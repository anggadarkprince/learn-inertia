import {Head, useForm} from '@inertiajs/react'
import {route} from "ziggy-js";
import App from "@/Layouts/App.jsx";
import Input from "@/Components/Input.jsx";
import TextArea from "@/Components/TextArea.jsx";
import Button from "@/Components/Button.jsx";

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
    } = useForm({
        category: '',
        description: '',
    })

    function submit(e) {
        e.preventDefault();
        clearErrors();
        post(route('categories.store'));
    }

    return (
        <App>
            <Head title="Create Category" />
            <div className="rounded bg-white dark:bg-gray-900 p-5">
                <h1 className="text-lg font-medium mb-3">Create new category</h1>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <Input
                        type="text"
                        label="Category"
                        placeholder="Category title"
                        name="category"
                        value={data.category}
                        onChange={e => setData('category', e.target.value)}
                        disabled={processing}
                        error={errors.category}
                        required/>
                    <TextArea
                        label="Description"
                        placeholder="Category description"
                        name="description"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        disabled={processing}
                        error={errors.description}
                        required/>

                    <div className="mt-4 text-end">
                        <Button type="submit" disabled={processing}>
                            Create Category
                        </Button>
                    </div>
                </form>
            </div>
        </App>
    )
}
