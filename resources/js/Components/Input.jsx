import ErrorText from '@/Components/ErrorText.jsx';

export default function Input({
  type = 'text',
  label,
  value,
  id,
  name,
  onChange,
  onFocus,
  onBlur,
  disabled,
  placeholder,
  required,
  readOnly,
  error,
}) {
  return (
    <div>
      <label htmlFor={id || name} className="text-sm text-gray-700 dark:text-gray-400 font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value?.name || value || ''}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="block w-full border px-3 py-2 rounded mt-1 text-sm disabled:bg-gray-100 dark:disabled:bg-gray-800 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 dark:text-gray-300"
        placeholder={placeholder}
        id={id || name}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
