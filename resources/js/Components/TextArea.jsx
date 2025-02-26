import FormError from '@/Components/ErrorText.jsx';
import {clsx} from 'clsx';

export default function TextArea({rows = 3, label, value, id, name, onChange, disabled, placeholder, required, error}) {
  return (
    <div>
      <label htmlFor={id || name} className="text-sm text-gray-700 dark:text-gray-400 font-medium">
        {label}
      </label>
      <textarea
        value={value || ''}
        onChange={onChange}
        className={clsx([
          'block w-full border px-3 py-2 rounded mt-1 text-sm disabled:bg-gray-100 dark:disabled:bg-gray-800 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-opacity-20 dark:text-gray-300',
          error
            ? 'border-red-500 focus:border-red-400 focus:ring-red-700'
            : 'dark:border-gray-600 focus:border-purple-400 focus:ring-purple-700',
        ])}
        placeholder={placeholder}
        rows={rows}
        id={id || name}
        name={name}
        disabled={disabled}
        required={required}
      />
      {error && <FormError>{error}</FormError>}
    </div>
  );
}
