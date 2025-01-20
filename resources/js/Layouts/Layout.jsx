import ThemeToggle from "@/Components/ThemeToggle.jsx";
import noAvatar from '../../img/no-avatar.png';
import NavItem from "@/Components/NavItem.jsx";
import Icon from "@/Components/Icon.jsx";
import {usePage} from "@inertiajs/react";
import {clsx} from "clsx";

export default function Layout({children}) {
    const {flash} = usePage().props;

    return (
        <div className="flex h-screen bg-purple-50 dark:bg-gray-800">
            <aside className="z-20 w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 shadow-sm scroll-wrapper">
                <div className="py-4 text-gray-500 dark:text-gray-400">
                    <a className="flex gap-2 items-center justify-center border-b dark:border-b-gray-700 pb-2 mx-4 text-lg font-medium text-gray-800 dark:text-gray-200 mb-4" href="/">
                        <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round"
                             strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        <span>Quick<span className="text-purple-600 font-bold">Turns</span></span>
                    </a>
                    <div className="flex items-center gap-3 px-6 mb-4">
                        <img src={noAvatar} className="w-10 h-10 rounded-full" alt="Avatar"/>
                        <div>
                            <h4 className="font-semibold text-base text-gray-800 dark:text-gray-200 leading-tight">Angga Ari Wijaya</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">angga@mail.com</p>
                        </div>
                    </div>
                    <div className="px-6 mb-4">
                        <button
                            className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                            Create Ticket
                            <span className="ms-2" aria-hidden="true">+</span>
                        </button>
                    </div>
                    <ul>
                        <li className="relative px-6 py-2">
                            <NavItem active={true} icon={'home'} href={'/'}>Dashboard</NavItem>
                        </li>
                        <li className="relative px-6 py-2">
                            <NavItem icon={'task'} href={'/categories'}>Categories</NavItem>
                        </li>
                        <li className="relative px-6 py-2">
                            <NavItem icon={'stack'} href={'/tickets'}>Tickets</NavItem>
                        </li>
                        <li className="relative px-6 py-2">
                            <NavItem icon={'cards'} href={'/queues'}>Queues</NavItem>
                        </li>
                        <li className="relative px-6 py-2">
                            <NavItem icon={'chart'} href={'/reports'}>Reports</NavItem>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="flex flex-col flex-1 w-full">
                <header className="z-10 py-4 bg-white dark:bg-gray-800 shadow-sm">
                    <div
                        className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                        <button
                            className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple">
                            <Icon name={'menu'}/>
                        </button>
                        <div className="flex justify-center flex-1 lg:mr-32">
                            <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                                <div className="absolute inset-y-0 flex items-center ps-3">
                                    <Icon name={'magnify'}/>
                                </div>
                                <input
                                    className="w-full ps-10 py-2 pe-2 text-base text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                                    type="text" placeholder="Search for tickets..." aria-label="Search"/>
                            </div>
                        </div>
                        <ul className="flex items-center flex-shrink-0 space-x-6">
                            <li className="flex">
                                <ThemeToggle/>
                            </li>
                        </ul>
                    </div>
                </header>
                <div className="p-4 text-gray-800 dark:text-gray-200">
                    {flash.message && (
                        <div className={clsx([
                            flash.status === 'danger' && 'bg-red-600',
                            flash.status === 'warning' && 'bg-orange-400',
                            flash.status === 'success' && 'bg-green-500',
                            (flash.status || 'primary') === 'primary' && 'bg-blue-500',
                            'text-white rounded text-base px-3 py-2 mb-2'
                        ])}>
                            {flash.message}
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </div>
    )
}
