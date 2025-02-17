import {Deferred, Head} from '@inertiajs/react';
import Main from '@/Layouts/Main.jsx';
import Pagination from '@/Components/Pagination.jsx';
import {formatDate} from 'date-fns';

export default function ScheduleServiceTime({scheduleServiceTimes}) {
  console.log(scheduleServiceTimes);
  return (
    <Main>
      <Head title="Schedule Service Time" />
      <div className="rounded-lg bg-white dark:bg-gray-900 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-medium">Schedule Service Time</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Schedule statistic & data summaries</p>
          </div>
        </div>
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th className="px-1.5 py-1" rowSpan={2}>
                No
              </th>
              <th className="px-1.5 py-1 text-start" rowSpan={2}>
                Date
              </th>
              <th className="px-1.5 py-1 text-start" rowSpan={2}>
                Category
              </th>
              <th className="px-1.5 py-1 text-center" rowSpan={2}>
                Ticket
              </th>
              <th className="px-1.5 py-1 text-center" colSpan={3}>
                Waiting (minutes)
              </th>
              <th className="px-1.5 py-1 text-center" colSpan={3}>
                Service (minutes)
              </th>
            </tr>
            <tr>
              <th className="px-1.5 py-1 text-center">Min</th>
              <th className="px-1.5 py-1 text-center">Max</th>
              <th className="px-1.5 py-1 text-center">Avg</th>
              <th className="px-1.5 py-1 text-center">Min</th>
              <th className="px-1.5 py-1 text-center">Max</th>
              <th className="px-1.5 py-1 text-center">Avg</th>
            </tr>
          </thead>
          <tbody>
            <Deferred
              data="scheduleServiceTimes"
              fallback={
                <tr>
                  <td colSpan="10" className="text-center py-2">
                    Loading...
                  </td>
                </tr>
              }
            >
              <ReportData scheduleServiceTimes={scheduleServiceTimes} />
            </Deferred>
            {scheduleServiceTimes !== undefined && scheduleServiceTimes.data.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-2">
                  No schedule data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <Pagination links={scheduleServiceTimes?.links} />
        </div>
      </div>
    </Main>
  );
}

const ReportData = ({scheduleServiceTimes}) => {
  return scheduleServiceTimes?.data?.map((schedule, index) => (
    <tr key={schedule.id} className="border-b border-gray-200 dark:border-gray-600">
      <td className="px-1.5 py-1 text-center">{scheduleServiceTimes.from + index}</td>
      <td className="px-1.5 py-1">{formatDate(schedule.date, 'dd MMM y')}</td>
      <td className="px-1.5 py-1">
        {schedule.category || 'No category'}
        <br />
        <small className="text-gray-400">{schedule.pic_name || 'No PIC'}</small>
      </td>
      <td className="px-1.5 py-1 text-center">{schedule.total_ticket || 0}</td>
      <td className="px-1.5 py-1 text-center">{new Intl.NumberFormat('id-ID').format(schedule.avg_waiting || 0)}</td>
      <td className="px-1.5 py-1 text-center">{new Intl.NumberFormat('id-ID').format(schedule.avg_service || 0)}</td>
      <td className="px-1.5 py-1 text-center">{new Intl.NumberFormat('id-ID').format(schedule.min_waiting || 0)}</td>
      <td className="px-1.5 py-1 text-center">{new Intl.NumberFormat('id-ID').format(schedule.max_waiting || 0)}</td>
      <td className="px-1.5 py-1 text-center">{new Intl.NumberFormat('id-ID').format(schedule.min_service || 0)}</td>
      <td className="px-1.5 py-1 text-center">{new Intl.NumberFormat('id-ID').format(schedule.max_service || 0)}</td>
    </tr>
  ));
};
