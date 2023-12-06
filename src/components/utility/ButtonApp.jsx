
import { Spinner } from "./Spinner"

export const ButtonApp = ({ content, type, appearance, isLoading, className, icon, onClick, disabled }) => {

    const disabledStyles = (disabled || isLoading) ? "opacity-80 !cursor-not-allowed ring-offset-0" : "active:scale-95";

    const appearances = {
        primary: "text-white bg-primary-600 ring-primary-300 ring-offset-primary-200 hover:ring-offset-primary-500 ring-1",
        secondary: "text-primary-600 hover:text-primary-500 bg-transparent outline-none border-0 ring-offset-0 ring-0 ring-offset-white !ring-offset-0 !shadow-transparent",
    };

    const iconClasses = ! content ? "!w-4 !px-4 !py-1" : "";

    return (
        <button
            type={ type }
            className={ `
                box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold transition-all duration-300 rounded-md cursor-pointer group ring-offset-2 ease focus:outline-none shadow-xl
                ${appearances[appearance]} ${ disabledStyles } ${ iconClasses } ${ className }
            ` }
            disabled={ disabled || isLoading }
            onClick={ onClick }
            >
            <span className="sr-only">{ content }</span>
            <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="relative z-20 flex items-center text-sm">
                { isLoading ? <Spinner /> : icon }
                { content }
            </span>
        </button>
    )
}
