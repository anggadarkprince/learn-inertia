import {Menu, MenuButton, MenuItem, MenuItems, MenuSeparator} from "@headlessui/react";
import {Link} from "@inertiajs/react";

export const Dropdown = ({children}) => {
    return (
        <Menu>
            {children}
        </Menu>
    );
}


Dropdown.Toggle = ({children}) => {
    return (
        <MenuButton as="span" className="inline-block">
            {children}
        </MenuButton>
    );
};

Dropdown.Menu = ({children}) => {
    return (
        <MenuItems anchor="bottom end" className="bg-white dark:bg-gray-700 text-base dark:text-gray-200 shadow rounded my-1 py-2 min-w-32">
            {children}
        </MenuItems>
    );
};

Dropdown.Item = ({children, href, prefetch, method, onClick, ...props}) => {
    const className = 'px-3 py-1.5 w-full flex gap-2 data-[focus]:bg-purple-50 dark:data-[focus]:bg-gray-800';
    return (
        <MenuItem>
            {() => onClick
                ? (
                    <button type={"button"} onClick={onClick} className={className}>
                        {children}
                    </button>
                )
                : (
                    <Link
                        {...(prefetch !== undefined ? {prefetch} : {})}
                        {...(method ? {href, method} : {href})}
                        {...props}
                        className={className}
                    >
                        {children}
                    </Link>
                )
            }
        </MenuItem>
    );
};

Dropdown.Separator = () => {
    return <MenuSeparator className="my-1 h-px bg-gray-100 dark:bg-gray-800"/>;
};
