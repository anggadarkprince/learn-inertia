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
        <MenuButton as="span">
            {children}
        </MenuButton>
    );
};

Dropdown.Menu = ({children}) => {
    return (
        <MenuItems anchor="bottom end" className="bg-white text-base shadow rounded mt-1 py-2 min-w-32">
            {children}
        </MenuItems>
    );
};

Dropdown.Item = ({children, href, prefetch, method, ...props}) => {
    return (
        <MenuItem>
            {() => (
                <Link
                    {...(prefetch !== undefined ? {prefetch} : {})}
                    {...(method ? {href, method} : {href})}
                    {...props}
                    className="px-3 py-1.5 w-full flex gap-2 data-[focus]:bg-purple-50"
                >
                    {children}
                </Link>
            )}
        </MenuItem>
    );
};

Dropdown.Separator = () => {
    return <MenuSeparator className="my-1 h-px bg-gray-100"/>;
};
