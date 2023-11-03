
import { Spinner } from "./Spinner"

export const ButtonApp = ({ content, type, appearance, isLoading, className, icon, onClick }) => {

    const disabledStyles = isLoading ? "opacity-80 !cursor-not-allowed ring-offset-0" : "";

    const appearances = {
        primary: "text-white bg-primary-600 ring-primary-300 ring-offset-primary-200 hover:ring-offset-primary-500",
        secondary: "text-gray-800 bg-white ring-gray-200 ring-offset-gray-500 hover:ring-offset-gray-400",
    };

    return (
        <button
            type={ type }
            className={ `
                box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold transition-all duration-300 rounded-md cursor-pointer group ring-offset-2 ring-1 ease focus:outline-none shadow-xl active:scale-95
                ${appearances[appearance]} ${ disabledStyles } ${ className }
            ` }
            disabled={ isLoading }
            onClick={ onClick }
            >
            <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="relative z-20 flex items-center text-sm">
                { isLoading ? <Spinner /> : icon }
                { content }
            </span>
        </button>
    )
}
