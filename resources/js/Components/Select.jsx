import {Select as ReactSelect} from '@headlessui/react';
import ErrorText from '@/Components/ErrorText.jsx';

export default function Select({label, value, id, name, onChange, disabled, placeholder, required, error, children}) {
  return (
    <div>
      <label htmlFor={id || name} className="text-sm text-gray-700 dark:text-gray-400 font-medium">
        {label}
      </label>
      <ReactSelect
        name={name}
        disabled={disabled}
        onChange={onChange}
        value={value}
        required={required}
        className="block w-full border px-3 py-2 rounded mt-1 text-sm disabled:bg-gray-100 dark:disabled:bg-gray-800 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 dark:text-gray-300"
        aria-label={label}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </ReactSelect>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
