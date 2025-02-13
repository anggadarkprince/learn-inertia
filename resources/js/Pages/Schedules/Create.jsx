import {Head, useForm} from '@inertiajs/react'
import {route} from "ziggy-js";
import Main from "@/Layouts/Main.jsx";
import Button from "@/Components/Button.jsx";
import Datepicker from "@/Components/Datepicker.jsx";
import {formatDate, subDays} from "date-fns";
import Select from "@/Components/Select.jsx";
import TextArea from "@/Components/TextArea.jsx";

export default function Create({users, categories}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
    } = useForm({
        date: '',
        pic_id: '',
        category_id: '',
        description: '',
    })

    function submit(e) {
        e.preventDefault();
        setData('date', formatDate(data.date, 'y-MM-d'));
        clearErrors();
        post(route('schedules.store'));
    }

    return (
        <Main>
            <Head title="Create Schedule" />
            <div className="rounded bg-white dark:bg-gray-900 p-5">
                <h1 className="text-lg font-medium mb-3">Create New Schedule</h1>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <Datepicker
                        label="Date"
                        placeholder="Select date"
                        name="date"
                        minDate={subDays(new Date(), 1)}
                        value={data.date}
                        onChange={date => setData('date', date ? formatDate(date, 'dd MMMM yyyy') : '')}
                        disabled={processing}
                        error={errors.date}
                        required
                    />
                    <Select
                        label="Person In Charge"
                        placeholder="Select PIC"
                        name="pic_id"
                        value={data.pic_id}
                        onChange={e => setData('pic_id', e.target.value)}
                        disabled={processing}
                        error={errors.pic_id}
                        required
                    >
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </Select>
                    <Select
                        label="Category"
                        placeholder="Select category"
                        name="category_id"
                        value={data.category_id}
                        onChange={e => setData('category_id', e.target.value)}
                        disabled={processing}
                        error={errors.category_id}
                        required
                    >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.category}
                            </option>
                        ))}
                    </Select>

                    <TextArea
                        label="Description"
                        placeholder="Schedule description"
                        name="description"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        disabled={processing}
                        error={errors.description}/>

                    <div className="mt-4 text-end">
                        <Button type="submit" disabled={processing}>
                            Create Schedule
                        </Button>
                    </div>
                </form>
            </div>
        </Main>
    )
}
