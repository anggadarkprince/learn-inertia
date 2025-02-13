import {Head, router} from '@inertiajs/react'
import Main from "@/Layouts/Main.jsx";
import {formatDate} from "date-fns";
import Button from "../../Components/Button.jsx";
import {route} from "ziggy-js";

export default function Show({schedule}) {
    return (
        <Main>
            <Head title={`Schedule ${schedule.date} - ${schedule.category?.category || 'No category'}`}/>
            <div className="space-y-3">
                <div className="rounded bg-white dark:bg-gray-900 p-5">
                    <h1 className="text-lg font-medium mb-3">View Schedule</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-base mb-3">
                        <div className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Date</div>
                                <div className="col-span-3">{schedule.date}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Category</div>
                                <div className="col-span-3">{schedule.category?.category || '-'}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">PIC</div>
                                <div className="col-span-3">{schedule.pic?.name || '-'}</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Description</div>
                                <div className="col-span-3">{schedule.description}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Created At</div>
                                <div className="col-span-3">{formatDate(schedule.created_at, 'dd MMM yyy HH:mm')}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="font-medium">Updated At</div>
                                <div className="col-span-3">
                                    {schedule?.updated_at ? formatDate(schedule?.updated_at, 'dd MMM yyy HH:mm') : '-'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between rounded bg-white dark:bg-gray-900 p-5">
                    <Button onClick={() => window.history.back()} disabled={window.history.length <= 1} color="light">
                    ← Back
                    </Button>
                    <Button onClick={() => router.visit(route('schedules.edit', {schedule}))} color="warning">
                        Edit Schedule
                    </Button>
                </div>
            </div>
        </Main>
    )
}
