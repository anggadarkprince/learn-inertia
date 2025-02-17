import {clsx} from 'clsx';

export default function TicketStatus({label}) {
  return (
    <span
      className={clsx([
        'px-2 py-1 rounded text-xs font-medium',
        label === 'PENDING' && 'bg-slate-300 text-gray-700',
        label === 'CANCELED' && 'bg-red-600 text-gray-100',
        label === 'OPEN' && 'bg-blue-500 text-gray-100',
        label === 'TAKEN' && 'bg-blue-500 text-gray-100',
        label === 'CLOSED' && 'bg-green-500 text-gray-100',
      ])}
    >
      {label}
    </span>
  );
}
