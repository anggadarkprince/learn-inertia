import {Head, router, useForm} from '@inertiajs/react'
import {route} from "ziggy-js";
import Main from "@/Layouts/Main.jsx";
import Button from "@/Components/Button.jsx";
import TextArea from "@/Components/TextArea.jsx";
import {z} from "zod";
import {useEffect} from "react";
import Input from "@/Components/Input.jsx";

const schema = z.object({
    name: z.string().trim().max(50, 'Name must be less than 50 characters').optional().nullable(),
    phone: z.string().trim().max(20, 'Phone must be less than 20 characters').optional().nullable(),
    email: z.string().email('Please input valid email')
        .max(50, 'Email must be less than 50 characters')
        .optional().nullable().or(z.literal('')),
    description: z.string().max(500, 'Maximum description is 500 characters').nullable()
        .optional()
        .nullable()
        .or(z.literal("")),
});

export default function Create({ticket}) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        setError,
        clearErrors,
    } = useForm({
        name: ticket.name,
        phone: ticket.phone,
        email: ticket.email,
        description: ticket.description,
    });

    function submit(e) {
        e.preventDefault();
        const result = schema.safeParse(data);
        if (result.success) {
            clearErrors();
            put(route('tickets.update', {ticket}));
        } else {
            const validationErrors = result.error.format();
            const parsedErrors = Object.keys(data).reduce((errors, property) => {
                errors[property] = validationErrors[property]?._errors || "";
                return errors;
            }, {});
            setError(parsedErrors);
        }
    }

    return (
        <Main>
            <Head title={`Edit Schedule ${ticket.ticket_number}`}/>
            <div className="rounded bg-white dark:bg-gray-900 p-5">
                <h1 className="text-lg font-medium mb-3">Edit Schedule</h1>
                <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
                    <Input
                        type="text"
                        label="Ticket Number"
                        readOnly
                        value={`${ticket.ticket_number} (Queue: ${ticket.queue})`}/>

                    <Input
                        type="text"
                        label="Name"
                        placeholder="User full name"
                        name="name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        disabled={processing}
                        error={errors.name}/>

                    <div className="grid sm:grid-cols-2 gap-3">
                        <Input
                            type="text"
                            label="Phone"
                            placeholder="Phone or mobile contact"
                            name="phone"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            disabled={processing}
                            error={errors.phone}/>

                        <Input
                            type="email"
                            label="Email"
                            placeholder="Email address"
                            name="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            disabled={processing}
                            error={errors.email}/>
                    </div>

                    <TextArea
                        label="Description"
                        placeholder="Specific request or issue"
                        name="description"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        disabled={processing}
                        error={errors.description}/>

                    <div className="mt-4 text-end">
                        <Button type="submit" disabled={processing} color="warning">
                            Update Ticket
                        </Button>
                    </div>
                </form>
            </div>
        </Main>
    )
}
