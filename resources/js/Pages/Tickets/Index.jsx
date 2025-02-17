import {Deferred, Head, router} from '@inertiajs/react';
import {route} from 'ziggy-js';
import Main from '@/Layouts/Main.jsx';
import Pagination from '@/Components/Pagination.jsx';
import {Dropdown} from '@/Components/Dropdown.jsx';
import Icon from '@/Components/Icon.jsx';
import Button from '@/Components/Button.jsx';
import {useState} from 'react';
import Confirm from '../../Components/Confirm.jsx';
import {formatDate} from 'date-fns';
import TicketStatus from "@/Pages/Tickets/Components/TicketStatus.jsx";

export default function Index({tickets}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [ticket, setTicket] = useState(null);

  return (
    <Main>
      <Head title="Tickets" />
      <div className="rounded-lg bg-white dark:bg-gray-900 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-medium">Tickets</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">All tickets data</p>
          </div>
          <Button href={route('tickets.create')} color="success">
            Create
          </Button>
        </div>
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th className="px-1.5 py-1">No</th>
              <th className="px-1.5 py-1 text-start">Ticket Number</th>
              <th className="px-1.5 py-1 text-start">Schedule</th>
              <th className="px-1.5 py-1 text-start">Category</th>
              <th className="px-1.5 py-1 text-start">PIC</th>
              <th className="px-1.5 py-1 text-start">Queue</th>
              <th className="px-1.5 py-1 text-start">Name</th>
              <th className="px-1.5 py-1 text-start">Status</th>
              <th className="px-1.5 py-1 w-10">Action</th>
            </tr>
          </thead>
          <tbody>
            <Deferred
              data="tickets"
              fallback={
                <tr>
                  <td colSpan="9" className="text-center py-2">
                    Loading...
                  </td>
                </tr>
              }
            >
              <TicketData tickets={tickets} setShowDeleteDialog={setShowDeleteDialog} setTicket={setTicket} />
            </Deferred>
            {tickets !== undefined && tickets.data.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-2">
                  No ticket data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <Pagination links={tickets?.links} />
        </div>
      </div>
      <Confirm
        title={'Delete Ticket'}
        message={`Are you sure want to delete ticket ${ticket?.ticket_number} for date ${ticket?.schedule?.date ? formatDate(ticket?.schedule?.date, 'dd MMMM y') : '-'} (${ticket?.name || 'No name'} - Queue: ${ticket?.queue})?`}
        submessage={'The deleted items cannot be reversed'}
        isOpen={showDeleteDialog}
        setIsOpen={setShowDeleteDialog}
        disabled={isDeleting}
        positiveButton="Delete"
        negativeButton="Cancel"
        positiveColor={'red'}
        onPositiveClicked={() => {
          setIsDeleting(true);
          router.delete(route('tickets.destroy', {ticket}), {
            onSuccess: () => setShowDeleteDialog(false),
            onFinish: () => setIsDeleting(false),
          });
        }}
      />
    </Main>
  );
}

const TicketData = ({tickets, setShowDeleteDialog, setTicket}) => {
  return tickets?.data?.map((ticket, index) => (
    <tr key={ticket.id} className="border-b border-gray-200 dark:border-gray-600">
      <td className="px-1.5 py-1 text-center">{tickets.from + index}</td>
      <td className="px-1.5 py-1">{ticket.ticket_number}</td>
      <td className="px-1.5 py-1">{formatDate(ticket.schedule?.date, 'dd MMMM y')}</td>
      <td className="px-1.5 py-1">{ticket.schedule?.category?.category || 'No category'}</td>
      <td className="px-1.5 py-1">{ticket.schedule?.pic?.name || 'No PIC'}</td>
      <td className="px-1.5 py-1">{ticket.queue}</td>
      <td className="px-1.5 py-1">{ticket.name || '-'}</td>
      <td className="px-1.5 py-1"><TicketStatus label={ticket.status} /></td>
      <td className="px-1.5 py-1 text-center">
        <Dropdown>
          <Dropdown.Toggle>
            <Button>
              Action <Icon name="chevron-down" size="sm" />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href={route('tickets.show', {ticket})} prefetch>
              <Icon name="eye" /> View
            </Dropdown.Item>
            <Dropdown.Item href={route('tickets.edit', {ticket})}>
              <Icon name="pencil" /> Edit
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item
              onClick={() => {
                setTicket(ticket);
                setShowDeleteDialog(true);
              }}
              as="button"
            >
              <Icon name="trash" /> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  ));
};
