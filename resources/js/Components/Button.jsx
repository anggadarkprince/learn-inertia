import {clsx} from 'clsx';
import {Link} from '@inertiajs/react';

export default function Button({
  type = 'button',
  as = 'button',
  block = false,
  size = 'base',
  color = 'purple',
  disabled,
  href,
  onClick,
  children,
}) {
  const Component = href || as === 'a' ? Link : as;
  let colorClass = 'bg-purple-600 active:bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400';
  switch (color) {
    case 'red':
    case 'danger':
      colorClass = 'bg-red-600 active:bg-red-700 hover:bg-red-500 disabled:bg-red-400';
      break;
    case 'green':
    case 'success':
      colorClass = 'bg-green-600 active:bg-green-700 hover:bg-green-500 disabled:bg-green-400';
      break;
    case 'orange':
    case 'warning':
      colorClass = 'bg-orange-500 active:bg-orange-600 hover:bg-orange-400 disabled:bg-orange-400';
      break;
    case 'light':
      colorClass = 'bg-gray-100 active:bg-gray-100 hover:bg-gray-50 disabled:bg-gray-100';
      break;
  }
  return (
    <Component
      {...(href ? {href} : {type})}
      onClick={onClick}
      className={clsx([
        [
          size === 'xl' && 'px-6 py-4 text-xl rounded-lg',
          size === 'lg' && 'px-5 py-3 text-lg rounded-lg',
          size === 'sm' && 'px-3 py-1 text-sm rounded',
          (size || 'base') === 'base' && 'px-4 py-2 text-base rounded-lg',
        ],
        'text-sm inline-flex justify-center items-center gap-2 font-medium leading-5 text-center transition-colors duration-150 border border-transparent focus:outline-none',
        block ? 'w-full block' : 'inline-block',
        color === 'light' ? (disabled ? 'text-gray-500' : 'text-gray-800') : 'text-white',
        colorClass,
      ])}
      disabled={disabled}
    >
      {children}
    </Component>
  );
}
