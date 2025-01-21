import Icon from "@/Components/Icon.jsx";
import ThemeToggle from "@/Components/ThemeToggle.jsx";

export default function Auth({children}) {
    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex gap-3 items-center text-center mb-6 dark:text-gray-100 text-gray-800 mt-3">
                <Icon name="cards" size='lg'/>
                <p className="text-2xl">
                    Quick<span className="text-purple-600 font-bold">Turns</span>
                </p>
            </div>
            <div
                className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="p-6 w-full">
                    {children}
                </div>
            </div>

            <div
                className="mt-10 flex items-center justify-between mx-auto text-purple-600 dark:text-purple-300 py-2 px-3 rounded-lg border dark:border-gray-700">
                <ThemeToggle showText/>
            </div>
        </div>
    )
}
