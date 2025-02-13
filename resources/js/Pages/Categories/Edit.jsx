import {Head, useForm} from '@inertiajs/react'
import {route} from "ziggy-js";
import Main from "@/Layouts/Main.jsx";
import Button from "@/Components/Button.jsx";
import TextArea from "@/Components/TextArea.jsx";
import Input from "@/Components/Input.jsx";

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
        <Main>
            <Head title={`Edit Category ${category.category}`}/>
            <div className="rounded bg-white dark:bg-gray-900 p-5">
                <h1 className="text-lg font-medium mb-3">Edit category</h1>
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
                        <Button type="submit" disabled={processing} color="warning">
                            Update Category
                        </Button>
                    </div>
                </form>
            </div>
        </Main>
    )
}
