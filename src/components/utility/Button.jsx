
import { Spinner } from "./Spinner"

export const Button = ({ content, type, appearance, isLoading, disabled, className }) => {

    const disabledStyles = disabled ? "opacity-80 cursor-not-allowed" : "";

    const appearances = {
        primary: "text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:ring-indigo-600 focus-visible:ring-offset-indigo-600 focus-visible:outline-indigo-600",
        secondary: "bg-white hover:bg-gray-50 focus-visible:ring-indigo-600 focus-visible:ring-offset-indigo-600",
    };

    return (
        <button
            type={ type }
            className={ ` ${appearances[appearance]} ${ disabledStyles } ${ className } flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:ring-offset-2 focus-visible:outline-offset-2 focus-visible:ring-2 ` }
            disabled={ disabled }
            >
            { isLoading && <Spinner /> }
            { content }
        </button>
    )
}

