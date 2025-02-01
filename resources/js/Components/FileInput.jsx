import FormError from "@/Components/ErrorText.jsx";
import Button from "@/Components/Button.jsx";

export default function FileInput({label, value, selectedValue, id, name, accept, onChange, disabled, placeholder = 'Pick a file', required, error}) {
    const selectedFile = (value?.name ? [value] : value) || selectedValue;
    return (
        <div>
            <label htmlFor={id || name} className="text-sm text-gray-700 dark:text-gray-400 font-medium">{label}</label>
            <label className="block w-full border px-3 py-2 rounded mt-1 text-sm disabled:bg-gray-100 dark:disabled:bg-gray-800 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 dark:text-gray-300">
                <Button as={'span'} size={'sm'}>{selectedFile ? 'Change File' : 'Pick File'}</Button>
                <span className="mx-2">
                    {Boolean(selectedFile?.length) ? (
                        <>Selected files: {Array.isArray(selectedFile) ? selectedFile.map(f => f.name).join(", ") : selectedFile}</>
                    ) : <span className="text-gray-400">{placeholder}</span>}
                </span>
                <input type="file" disabled={disabled} required={required} onChange={onChange} accept={accept} className="invisible hidden"/>
            </label>
            {error && <FormError>{error}</FormError>}
        </div>
    )
}
