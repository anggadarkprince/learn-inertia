import {clsx} from "clsx";

export default function Button({type = 'button', block = false, color = 'purple', disabled, children}) {
    let colorClass = 'bg-purple-600 active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple disabled:bg-purple-400';
    switch (color) {
        case 'red':
        case 'danger':
            colorClass = 'bg-red-600 active:bg-red-600 hover:bg-red-700 focus:shadow-outline-red disabled:bg-red-400';
            break;
        case 'green':
        case 'success':
            colorClass = 'bg-green-600 active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green disabled:bg-green-400';
            break;
        case 'yellow':
        case 'warning':
            colorClass = 'bg-yellow-600 active:bg-yellow-600 hover:bg-yellow-700 focus:shadow-outline-yellow disabled:bg-yellow-400';
            break;
    }
    return (
        <button type={type}
                className={clsx([
                    'px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none',
                    block ? 'w-full block' : 'inline-block',
                    colorClass,
                ])}
                disabled={disabled}>
            {children}
        </button>
    )
}
