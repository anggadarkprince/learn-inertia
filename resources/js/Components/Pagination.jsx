import {clsx} from "clsx";
import {router} from "@inertiajs/react";

export default function Pagination({links, onPageChange, data}) {
    return (
        <nav className="flex items-center space-x-1 text-gray-800 dark:text-gray-200">
            {links?.map((link, index) => (
                <button
                    type="button"
                    key={index}
                    dangerouslySetInnerHTML={{__html: link.label}}
                    className={clsx([
                        'px-2 py-1 rounded text-sm text-center',
                        link.active ? 'bg-purple-500 hover:bg-purple-400 text-white' : 'bg-gray-100 dark:bg-gray-800',
                        !link.url ? `bg-gray-100 text-gray-400 dark:text-gray-400` : 'hover:bg-purple-400 hover:text-white'
                    ])}
                    onClick={() => {
                        if (onPageChange) {
                            link.url && onPageChange(link.url);
                        } else {
                            link.url && router.visit(link.url, {
                                ...(data ? {only: [data]}: {}),
                                preserveScroll: true,
                            })
                        }
                    }}
                    disabled={!link.url}
                />
            ))}
        </nav>
    )
}
