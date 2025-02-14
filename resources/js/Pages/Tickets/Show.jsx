import {Head, router} from '@inertiajs/react'
import Main from "@/Layouts/Main.jsx";
import {formatDate} from "date-fns";
import Button from "../../Components/Button.jsx";
import {route} from "ziggy-js";

export default function Show({ticket}) {
    return (
        <Main>
            <Head title={`Ticket ${ticket.ticket_number} - ${ticket.schedule?.date || '-'}`}/>
            <div className="space-y-3">
                <div className="rounded bg-white dark:bg-gray-900 p-5">
                    <h1 className="text-lg font-medium mb-3">View Ticket</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-base mb-3">
                        <div className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Ticket Number</div>
                                <div className="col-span-3">{ticket.ticket_number}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Queue</div>
                                <div className="col-span-3">{ticket.queue}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Status</div>
                                <div className="col-span-3">{ticket.status}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Date</div>
                                <div className="col-span-3">
                                    {ticket?.schedule?.date ? formatDate(ticket?.schedule?.date, 'dd MMMM y') : '-'}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Category</div>
                                <div className="col-span-3">{ticket?.schedule.category?.category || '-'}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">PIC</div>
                                <div className="col-span-3">{ticket?.schedule.pic?.name || '-'}</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Description</div>
                                <div className="col-span-3">{ticket.description || '-'}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Name</div>
                                <div className="col-span-3">{ticket.name}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Email</div>
                                <div className="col-span-3">{ticket.email || '-'}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Phone</div>
                                <div className="col-span-3">{ticket.phone || '-'}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Created At</div>
                                <div className="col-span-3">{formatDate(ticket.created_at, 'dd MMM y HH:mm')}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Updated At</div>
                                <div className="col-span-3">
                                    {ticket?.updated_at ? formatDate(ticket?.updated_at, 'dd MMM y HH:mm') : '-'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between rounded bg-white dark:bg-gray-900 p-5">
                    <Button onClick={() => window.history.back()} disabled={window.history.length <= 1} color="light">
                    ← Back
                    </Button>
                    <Button onClick={() => router.visit(route('tickets.edit', {ticket}))} color="warning">
                        Edit Ticket
                    </Button>
                </div>
            </div>
        </Main>
    )
}
