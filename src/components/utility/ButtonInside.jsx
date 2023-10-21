
import { Spinner } from "./Spinner"

export const ButtonInside = ({ content, type, appearance, isLoading, className, icon, onClick }) => {

    const disabledStyles = isLoading ? "cursor-not-allowed" : "";

    const appearances = {
        primary: "bg-primary-600 border-primary-400 text-white",
        secondary: "bg-white border-gray-400 text-primary-600",
    };

    return (
        <button
            type={ type }
            className={ ` ${appearances[appearance]} ${ disabledStyles } ${ className } inline-flex items-center justify-center rounded border-2 px-1 font-sans text-xs font-semibold ` }
            disabled={ isLoading }
            onClick={ onClick }
            >
            { isLoading 
                ? <Spinner className="!mr-0" />
                : <> { icon } { content } </>
            }
        </button>
    )
}

