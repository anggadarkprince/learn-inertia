import {clsx} from "clsx";

export default function Button({type = 'button', block = false, color = 'purple', disabled, children}) {
    return (
        <button type={type}
                className={clsx([
                    'px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none',
                    block ? 'w-full block' : 'inline-block',
                    `bg-${color}-600 active:bg-${color}-600 hover:bg-${color}-700 focus:shadow-outline-${color}`,
                    disabled && `disabled:bg-${color}-400`,
                ])}
                disabled={disabled}>
            {children}
        </button>
    )
}
