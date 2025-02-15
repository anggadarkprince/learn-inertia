import {Head} from '@inertiajs/react';
import Main from '../../Layouts/Main.jsx';
import {formatDate} from "date-fns";

export default function Index({statistic}) {
  return (
    <Main>
      <Head title="Dashboard" />
      <div className="rounded bg-white dark:bg-gray-900 p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-medium">Welcome</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard data summary</p>
          </div>
        </div>
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <div className="rounded border bg-white dark:bg-gray-900 p-5">
            <h2>Outstanding Queue</h2>
            <p className="text-sm text-gray-400 mb-1">Tickets that are still open</p>
            <h3 className="text-xl font-bold">{statistic.open_ticket || 0}</h3>
          </div>
          <div className="rounded border bg-white dark:bg-gray-900 p-5">
            <h2>Ticket Closed</h2>
            <p className="text-sm text-gray-400 mb-1">Tickets that were resolved</p>
            <h3 className="text-xl font-bold">{statistic.closed_ticket || 0}</h3>
          </div>
          <div className="rounded border bg-white dark:bg-gray-900 p-5">
            <h2>Peak Hours</h2>
            <p className="text-sm text-gray-400 mb-1">The most ticket created</p>
            <h3 className="text-xl font-bold">
              {statistic.peak_hour ? formatDate(statistic.peak_hour.min, 'HH:mm') : '-'}
              <span className="text-base text-gray-500 font-normal mx-2">to</span>
              {statistic.peak_hour ? formatDate(statistic.peak_hour.max, 'HH:mm') : '-'}
            </h3>
          </div>
          <div className="rounded border bg-white dark:bg-gray-900 p-5">
            <h2>Average Time</h2>
            <div className="flex gap-3">
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Waiting time</p>
                <h3 className="text-xl font-bold">{statistic.average_time?.waiting_time || 0} min</h3>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Service time</p>
                <h3 className="text-xl font-bold">{statistic.average_time?.service_time || 0} min</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}
