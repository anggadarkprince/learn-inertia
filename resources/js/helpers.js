export const validate = (schema, data, setError, clearErrors) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        const validationErrors = result.error.format();
        const parsedErrors = Object.keys(data).reduce((errors, property) => {
            errors[property] = validationErrors[property]?._errors || "";
            return errors;
        }, {});
        setError(parsedErrors);
    } else {
        clearErrors();
    }
    return result.success;
}
