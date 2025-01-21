import {clsx} from "clsx";

export default function Alert({color, children}) {
    return (
        <div className={clsx([
            color === 'danger' && 'bg-red-600',
            color === 'warning' && 'bg-orange-400',
            color === 'success' && 'bg-green-500',
            (color || 'primary') === 'primary' && 'bg-blue-500',
            'text-white rounded text-sm px-3 py-2 mb-2'
        ])}>
            {children}
        </div>
    )
}
