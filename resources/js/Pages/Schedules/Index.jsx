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

export default function Index({schedules}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [schedule, setSchedule] = useState(null);

  return (
    <Main>
      <Head title="Schedules" />
      <div className="rounded-lg bg-white dark:bg-gray-900 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-medium">Schedules</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">All schedule data</p>
          </div>
          <Button href={route('schedules.create')} color="success">
            Create
          </Button>
        </div>
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th className="px-1.5 py-1">No</th>
              <th className="px-1.5 py-1 text-start">Date</th>
              <th className="px-1.5 py-1 text-start">Category</th>
              <th className="px-1.5 py-1 text-start">PIC</th>
              <th className="px-1.5 py-1 text-start">Description</th>
              <th className="px-1.5 py-1 w-10">Action</th>
            </tr>
          </thead>
          <tbody>
            <Deferred
              data="schedules"
              fallback={
                <tr>
                  <td colSpan="6" className="text-center py-2">
                    Loading...
                  </td>
                </tr>
              }
            >
              <ScheduleData schedules={schedules} setShowDeleteDialog={setShowDeleteDialog} setSchedule={setSchedule} />
            </Deferred>
            {schedules !== undefined && schedules.data.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-2">
                  No schedule data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <Pagination links={schedules?.links} />
        </div>
      </div>
      <Confirm
        title={'Delete Schedule'}
        message={`Are you sure want to delete schedule ${schedule?.date ? formatDate(schedule.date, 'dd MMM y') : '-'} (${schedule?.pic?.name})?`}
        submessage={'The deleted items cannot be reversed'}
        isOpen={showDeleteDialog}
        setIsOpen={setShowDeleteDialog}
        disabled={isDeleting}
        positiveButton="Delete"
        negativeButton="Cancel"
        positiveColor={'red'}
        onPositiveClicked={() => {
          setIsDeleting(true);
          router.delete(route('schedules.destroy', {schedule}), {
            onSuccess: () => setShowDeleteDialog(false),
            onFinish: () => setIsDeleting(false),
          });
        }}
      />
    </Main>
  );
}

const ScheduleData = ({schedules, setShowDeleteDialog, setSchedule}) => {
  return schedules?.data?.map((schedule, index) => (
    <tr key={schedule.id} className="border-b border-gray-200 dark:border-gray-600">
      <td className="px-1.5 py-1 text-center">{schedules.from + index}</td>
      <td className="px-1.5 py-1">{formatDate(schedule.date, 'dd MMMM y')}</td>
      <td className="px-1.5 py-1">{schedule.category?.category || 'No category'}</td>
      <td className="px-1.5 py-1">{schedule.pic?.name || 'No PIC'}</td>
      <td className="px-1.5 py-1">{schedule.description || '-'}</td>
      <td className="px-1.5 py-1 text-center">
        <Dropdown>
          <Dropdown.Toggle>
            <Button>
              Action <Icon name="chevron-down" size="sm" />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href={route('schedules.show', {schedule})} prefetch>
              <Icon name="eye" /> View
            </Dropdown.Item>
            <Dropdown.Item href={route('schedules.edit', {schedule})}>
              <Icon name="pencil" /> Edit
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item
              onClick={() => {
                setSchedule(schedule);
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
