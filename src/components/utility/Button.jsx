
import { Spinner } from "./Spinner"

export const Button = ({ content, type, appearance, isLoading, className, icon }) => {

    const disabledStyles = isLoading ? "opacity-80 cursor-not-allowed" : "";

    const appearances = {
        primary: "text-white bg-primary-600 hover:bg-primary-500 focus-visible:ring-primary-600 focus-visible:ring-offset-primary-600 focus-visible:outline-primary-600",
        secondary: "bg-white border-2 border-gray-300 hover:bg-gray-50 focus-visible:ring-primary-600 focus-visible:ring-offset-primary-600",
    };

    return (
        <button
            type={ type }
            className={ ` ${appearances[appearance]} ${ disabledStyles } ${ className } flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:ring-offset-2 focus-visible:outline-offset-2 focus-visible:ring-2 transition-colors ` }
            disabled={ isLoading }
            >
            { icon }
            { isLoading && <Spinner /> }
            { content }
        </button>
    )
}

