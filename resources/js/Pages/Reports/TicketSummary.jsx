import {Deferred, Head} from '@inertiajs/react';
import Main from '@/Layouts/Main.jsx';
import Pagination from '@/Components/Pagination.jsx';
import {formatDate} from 'date-fns';
import TicketStatus from '@/Pages/Tickets/Components/TicketStatus.jsx';

export default function ScheduleServiceTime({ticketSummaries}) {
  return (
    <Main>
      <Head title="Ticket Summaries" />
      <div className="rounded-lg bg-white dark:bg-gray-900 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-medium">Ticket Summaries</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Ticket detail summaries</p>
          </div>
        </div>
        <div className="overflow-x-auto scroll-wrapper">
          <table className="w-full text-base">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="px-1.5 py-1">No</th>
                <th className="px-1.5 py-1 text-start">Ticket Number</th>
                <th className="px-1.5 py-1 text-start">Queue</th>
                <th className="px-1.5 py-1 text-start">Date</th>
                <th className="px-1.5 py-1 text-start">Category</th>
                <th className="px-1.5 py-1 text-start">Name</th>
                <th className="px-1.5 py-1 text-start">Phone</th>
                <th className="px-1.5 py-1 text-start">Email</th>
                <th className="px-1.5 py-1 text-start">Description</th>
                <th className="px-1.5 py-1 text-start">Created At</th>
                <th className="px-1.5 py-1 text-start">Taken At</th>
                <th className="px-1.5 py-1 text-start">Handled By</th>
                <th className="px-1.5 py-1 text-start">Closed At</th>
                <th className="px-1.5 py-1 text-start">Status</th>
              </tr>
            </thead>
            <tbody>
              <Deferred
                data="ticketSummaries"
                fallback={
                  <tr>
                    <td colSpan="14" className="text-center py-2">
                      Loading...
                    </td>
                  </tr>
                }
              >
                <ReportData ticketSummaries={ticketSummaries} />
              </Deferred>
              {ticketSummaries !== undefined && ticketSummaries.data.length === 0 && (
                <tr>
                  <td colSpan="14" className="text-center py-2">
                    No ticket data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination links={ticketSummaries?.links} />
        </div>
      </div>
    </Main>
  );
}

const ReportData = ({ticketSummaries}) => {
  return ticketSummaries?.data?.map((ticket, index) => (
    <tr key={ticket.id} className="border-b border-gray-200 dark:border-gray-600">
      <td className="px-1.5 py-1 text-center">{ticketSummaries.from + index}</td>
      <td className="px-1.5 py-1">{ticket.ticket_number}</td>
      <td className="px-1.5 py-1">{ticket.queue}</td>
      <td className="px-1.5 py-1 text-nowrap">{ticket.date ? formatDate(ticket.date, 'dd MMM y') : '-'}</td>
      <td className="px-1.5 py-1">{ticket.category || 'No category'}</td>
      <td className="px-1.5 py-1 min-w-36">{ticket.name || '-'}</td>
      <td className="px-1.5 py-1">{ticket.phone || '-'}</td>
      <td className="px-1.5 py-1">{ticket.email || '-'}</td>
      <td className="px-1.5 py-1">{ticket.description || '-'}</td>
      <td className="px-1.5 py-1 text-nowrap">{formatDate(ticket.created_at, 'dd MMM y HH:mm:ss')}</td>
      <td className="px-1.5 py-1 text-nowrap">
        {ticket.taken_at ? formatDate(ticket.taken_at, 'dd MMM y HH:mm:ss') : '-'}
      </td>
      <td className="px-1.5 py-1 min-w-36">{ticket.handled_by || '-'}</td>
      <td className="px-1.5 py-1 text-nowrap">
        {ticket.closed_at ? formatDate(ticket.closed_at, 'dd MMM y HH:mm:ss') : '-'}
      </td>
      <td className="px-1.5 py-1">
        <TicketStatus label={ticket.status} />
      </td>
    </tr>
  ));
};
