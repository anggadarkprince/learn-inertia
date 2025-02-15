import {clsx} from 'clsx';

export default function ProgressBar({value = 0, max = 100}) {
  return (
    <progress
      value={value}
      max={max}
      className={clsx([
        'h-1 rounded-sm',
        '[&::-webkit-progress-bar]:rounded-sm',
        '[&::-webkit-progress-bar]:bg-purple-500',
        '[&::-webkit-progress-value]:bg-purple-500',
        '[&::-moz-progress-bar]:bg-purple-500',
      ])}
    >
      {value}%
    </progress>
  );
}
