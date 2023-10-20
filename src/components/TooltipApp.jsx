
import { Tooltip } from "react-tooltip";

export const TooltipApp = ({ id, text }) => {
    return (
        <Tooltip 
            id={ id }
            disableStyleInjection={true}
            opacity={1}
            >
            <div className='max-w-sm flex flex-row items-center gap-3 px-5 py-3 text-center text-sm font-medium text-gray-950 bg-white border-2 border-gray-400 rounded-lg shadow-lg'>
                {/* <ExclamationCircleIcon className="h-7 w-7 bg-indigo-100 text-indigo-700 p-1 rounded-full flex-shrink-0" /> */}
                { text }
            </div>
        </Tooltip>
    )
}

