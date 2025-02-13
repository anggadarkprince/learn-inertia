import ReactDatepicker from "tailwind-datepicker-react"
import {useEffect, useRef, useState} from "react";
import Icon from "@/Components/Icon.jsx";
import Input from "@/Components/Input.jsx";
import {formatDate} from "date-fns";

export default function Datepicker({
                                       label,
                                       id,
                                       name,
                                       maxDate,
                                       minDate,
                                       format = 'dd MMMM yyyy',
                                       clearLabel = 'Clear',
                                       value,
                                       show = false,
                                       setShow,
                                       onChange,
                                       disabled,
                                       placeholder,
                                       required,
                                       error
                                   }) {

    const datepickerRef = useRef(null);
    if (value && typeof value === 'string') {
        value = new Date(value);
    }
    const [date, setDate] = useState(value);
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        function handleClickOutside(event) {
            if (datepickerRef.current && !datepickerRef.current.contains(event.target)) {
                handleVisibility(false);
            }
            if (
                event.target.tagName.toLowerCase() === "button" &&
                event.target.innerHTML === clearLabel
            ) {
                handleChange(null);
                handleVisibility(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (selectedDate) => {
        setDate(selectedDate);
        if (onChange) {
            onChange(selectedDate);
        }
    }

    const handleVisibility = (state) => {
        setVisible(state);
        if (setShow) {
            setShow(state);
        }
    }

    const options = {
        autoHide: true,
        todayBtn: true,
        clearBtn: true,
        clearBtnText: clearLabel,
        maxDate: maxDate,
        minDate: minDate,
        theme: {
            background: "border border-gray-200 bg-white dark:bg-gray-800 p-2",
            todayBtn: "bg-purple-600 hover:bg-purple-700",
            clearBtn: "",
            icons: "",
            text: "hover:bg-purple-100",
            disabledText: "!text-gray-400",
            input: "",
            inputIcon: "",
            selected: "bg-purple-600 hover:bg-purple-500",
        },
        icons: {
            prev: () => <Icon name={'chevron-left'}/>,
            next: () => <Icon name={'chevron-right'}/>,
        },
        datepickerClassNames: "top-14",
        defaultDate: date ? (date instanceof Date ? date : new Date(date)) : null,
        language: "en",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputNameProp: {name},
        inputIdProp: {id},
        inputPlaceholderProp: placeholder,
        inputDateFormatProp: {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    }

    return (
        <div ref={datepickerRef} className="relative w-full">
            <ReactDatepicker options={options} onChange={handleChange} show={visible} setShow={handleVisibility}>
                <Input
                    type="text"
                    label={label}
                    placeholder={placeholder}
                    name={name}
                    value={date ? formatDate(date instanceof Date ? date : new Date(date), format) : ''}
                    readOnly={true}
                    onFocus={() => handleVisibility(true)}
                    disabled={disabled}
                    error={error}
                    required={required}/>
            </ReactDatepicker>
        </div>
    )
}
