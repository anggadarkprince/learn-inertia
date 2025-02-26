import Icon from '@/Components/Icon.jsx';
import {clsx} from 'clsx';
import {Link} from '@inertiajs/react';

export default function NavItem({active, icon, href, method, children, ...props}) {
  const Component = href && href !== '#' ? Link : 'button';
  return (
    <>
      {active && (
        <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" />
      )}
      <Component
        className={clsx([
          'inline-flex items-center w-full text-base transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200',
          active ? 'text-gray-800 dark:text-gray-200 font-semibold' : 'dark:text-gray-400 font-medium',
        ])}
        {...(method ? {href, method} : {href})}
        {...props}
      >
        <Icon name={icon} />
        <span className="ms-2 flex items-center gap-2">{children}</span>
      </Component>
    </>
  );
}
