import ThemeToggle from '@/Components/ThemeToggle.jsx';
import noAvatar from '../../img/no-avatar.png';
import NavItem from '@/Components/NavItem.jsx';
import Icon from '@/Components/Icon.jsx';
import {usePage} from '@inertiajs/react';
import Alert from '@/Components/Alert.jsx';
import {route} from 'ziggy-js';

export default function Main({children}) {
  const {
    props: {flash, errors, auth},
    url,
    component,
  } = usePage();

  return (
    <div className="flex h-screen bg-purple-50 dark:bg-gray-800">
      <div className="z-20 w-64 my-3 ms-3 overflow-y-auto overflow-clip scroll-wrapper">
        <aside className="bg-white dark:bg-gray-900 md:block flex-shrink-0 shadow-sm rounded-lg">
          <div className="py-4 text-gray-700 dark:text-gray-400">
            <a
              className="flex gap-2 items-center justify-center dark:border-b-gray-700 pb-2 mx-4 text-xl font-medium text-gray-800 dark:text-gray-200 mb-4"
              href="/"
            >
              <Icon name="stack" />
              <p>
                Quick<span className="text-purple-600 font-bold">Turns</span>
              </p>
            </a>
            <div className="flex items-center gap-3 px-6 mb-4">
              <img
                src={auth?.user?.avatar_url ? auth.user.avatar_url : noAvatar}
                className="w-10 h-10 rounded-full object-cover"
                alt="Avatar"
              />
              <div>
                <h4 className="font-semibold text-base text-gray-800 dark:text-gray-200 leading-tight">
                  {auth?.user?.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">{auth?.user?.email}</p>
              </div>
            </div>
            <div className="px-6 mb-4">
              <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Create Ticket
                <span className="ms-2" aria-hidden="true">
                  +
                </span>
              </button>
            </div>
            <ul>
              <li className="relative px-6 py-2">
                <NavItem active={component === 'Dashboard/Index'} icon={'home'} href={'/'}>
                  Dashboard
                </NavItem>
              </li>
              <li className="relative px-6 py-2">
                <NavItem active={url.startsWith('/users')} icon={'user'} href={route('users.index')}>
                  Users
                </NavItem>
              </li>
              <li className="relative px-6 py-2">
                <NavItem active={url.startsWith('/categories')} icon={'task'} href={route('categories.index')}>
                  Categories
                </NavItem>
              </li>
              <li className="relative px-6 py-2">
                <NavItem active={url.startsWith('/schedules')} icon={'calendar'} href={route('schedules.index')}>
                  Schedules
                </NavItem>
              </li>
              <li className="relative px-6 py-2">
                <NavItem active={url.startsWith('/tickets')} icon={'stack'} href={'/tickets'}>
                  Tickets
                </NavItem>
              </li>
              <li className="relative px-6 py-2">
                <NavItem active={url.startsWith('/queues')} icon={'cards'} href={'/queues'}>
                  Queues
                </NavItem>
              </li>
              <li className="relative px-6 py-2">
                <NavItem active={url.startsWith('/reports')} icon={'chart'} href="#">
                  Reports
                </NavItem>
                <ul>
                  <li className="ms-2 text-base py-1 text-gray-500">
                    <NavItem
                      active={url.startsWith('/reports/schedule-service-time')}
                      href={route('reports.schedule-service-time')}
                    >
                      <Icon name="document" size="sm" /> Schedule Services
                    </NavItem>
                  </li>
                  <li className="ms-2 text-base py-1 text-gray-500">
                    <NavItem active={url.startsWith('/reports/ticket-summary')} href={route('reports.ticket-summary')}>
                      <Icon name="document" size="sm" /> Ticket Summaries
                    </NavItem>
                  </li>
                </ul>
              </li>
              <li className="relative px-6 py-2">
                <NavItem icon={'logout'} href={route('auth.logout')} method="post" as="button">
                  Logout
                </NavItem>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <div className="flex flex-col flex-1 w-full overflow-y-auto scroll-wrapper">
        <header className="z-10 py-4 bg-white dark:bg-gray-900 shadow-sm mx-3 mt-3 rounded-lg">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
            <button className="p-1 mr-5 -ml-1 rounded-md hover:bg-purple-100 dark:hover:bg-gray-950 focus:outline-none focus:shadow-outline-purple">
              <Icon name={'menu'} />
            </button>
            <div className="flex justify-center flex-1">
              <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                <div className="absolute inset-y-0 flex items-center ps-3">
                  <Icon name={'magnify'} />
                </div>
                <input
                  className="w-full ps-10 py-2 pe-2 text-base text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                  type="text"
                  placeholder="Search for tickets..."
                  aria-label="Search"
                />
              </div>
            </div>
            <ul className="flex items-center flex-shrink-0 space-x-6">
              <li className="flex">
                <ThemeToggle />
              </li>
            </ul>
          </div>
        </header>
        <div className="p-3 text-gray-800 dark:text-gray-200">
          {(flash?.message || errors?.message) && (
            <Alert color={flash?.status || errors.status} dismissible={true}>
              {flash.message || errors.message}
            </Alert>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
