import Icon from "@/Components/Icon.jsx";
import {clsx} from "clsx";

export default function NavItem({active, icon, href, children}) {
    return (
        <>
            {active && <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>}
            <a className={clsx([
                'inline-flex items-center w-full text-base transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100',
                active ? 'text-gray-800 font-semibold' : 'font-medium '
            ])}
               href={href}>
                <Icon name={icon}/>
                <span className="ms-4">{children}</span>
            </a>
        </>
    )
}
