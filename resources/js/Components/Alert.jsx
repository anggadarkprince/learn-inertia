import {clsx} from "clsx";
import {useEffect, useState} from "react";

export default function Alert({color, show = true, setShow, dismissible = false, children}) {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        setVisible(show);
    }, [show]);

    const onClose = () => {
        setVisible(false);
        if (setShow) {
            setShow(false);
        }
    }

    if (!visible) {
        return null;
    }

    return (
        <div className={clsx([
            color === 'danger' && 'bg-red-600',
            color === 'warning' && 'bg-orange-400',
            color === 'success' && 'bg-green-500',
            (color || 'primary') === 'primary' && 'bg-blue-500',
            'text-white rounded text-sm px-3 py-2.5 mb-2 relative'
        ])}>
            {children}
            {dismissible && (
                <span
                    className="absolute end-3 top-1 py-1.5 opacity-80 hover:opacity-60 cursor-pointer"
                    onClick={onClose}
                >
                    ✕
                </span>
            )}
        </div>
    )
}
