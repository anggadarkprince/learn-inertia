import {Head, Link, router} from '@inertiajs/react';
import Main from '@/Layouts/Main.jsx';
import {formatDate} from 'date-fns';
import Button from '../../Components/Button.jsx';
import {route} from 'ziggy-js';

export default function Show({schedule}) {
  return (
    <Main>
      <Head title={`Schedule ${schedule.date} - ${schedule.category?.category || 'No category'}`} />
      <div className="space-y-3">
        <div className="rounded bg-white dark:bg-gray-900 p-5">
          <h1 className="text-lg font-medium mb-3">View Schedule</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-base mb-3">
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="font-medium">Date</div>
                <div className="col-span-3">{formatDate(schedule.date, 'd MMMM y')}</div>
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
                <div className="col-span-3">{schedule.description || '-'}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="font-medium">Created At</div>
                <div className="col-span-3">{formatDate(schedule.created_at, 'dd MMM y HH:mm')}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="font-medium">Updated At</div>
                <div className="col-span-3">
                  {schedule?.updated_at ? formatDate(schedule?.updated_at, 'dd MMM y HH:mm') : '-'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded bg-white dark:bg-gray-900 p-5">
          <h1 className="text-lg font-medium mb-3">Tickets</h1>

          <table className="w-full text-base">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="px-1.5 py-1 text-center">No</th>
                <th className="px-1.5 py-1 text-start">Ticket Number</th>
                <th className="px-1.5 py-1 text-start">Name</th>
                <th className="px-1.5 py-1 text-start">Phone</th>
                <th className="px-1.5 py-1 text-start">Email</th>
                <th className="px-1.5 py-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {schedule.tickets.map((ticket, index) => {
                return (
                  <tr key={ticket.ticket_number} className="border-b border-gray-200 dark:border-gray-600">
                    <td className="px-1.5 py-1 text-center">{index + 1}</td>
                    <td className="px-1.5 py-1">
                      <Link href={route('tickets.show', ticket)} className="text-purple-600 hover:text-purple-500">
                        {ticket.ticket_number}
                      </Link>
                    </td>
                    <td className="px-1.5 py-1">{ticket.name || '-'}</td>
                    <td className="px-1.5 py-1">{ticket.phone || '-'}</td>
                    <td className="px-1.5 py-1">{ticket.email || '-'}</td>
                    <td className="px-1.5 py-1 text-center">{ticket.status}</td>
                  </tr>
                );
              })}
              {schedule.tickets.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-2">
                    No ticket data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
  );
}
