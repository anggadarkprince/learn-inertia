import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        "./resources/**/*.jsx",
        './resources/**/*.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
        fontSize: {
            xs: ['0.7rem'],
            sm: ['0.8rem'],
            base: ['0.9rem'],
        },
    },
    darkMode: 'selector',
    plugins: [],
};
