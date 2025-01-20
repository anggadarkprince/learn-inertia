import Icon from "@/Components/Icon.jsx";

export default function Auth({children}) {
    return (
        <div className="flex flex-col items-center min-w-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex gap-3 items-center text-center mb-4 dark:text-gray-100 text-gray-800">
                <Icon name="cards"/>
                <p className="text-lg">
                    Quick<span className="text-purple-600 font-bold">Turns</span>
                </p>
            </div>
            <div
                className="flex-1 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="p-6 w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}
