import {useEffect, useState} from "react";
import Icon from "@/Components/Icon.jsx";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light' // Default to 'light' theme
    );

    useEffect(() => {
        // Add the theme class to the root element
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Save the theme in localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };
console.log(theme)
    return (
        <button
            onClick={toggleTheme}
            className="rounded-md focus:outline-none focus:shadow-outline-purple"
        >
            {theme === 'dark' ? <Icon name={'sun'}/> : <Icon name={'moon'}/>}
        </button>
    );
}
