import { forwardRef } from "react"

export const InputText = forwardRef((props, ref) => {

    const { id, name, type, placeholder, disabled, error } = props;

    const disabledClass = disabled ? "bg-gray-100 cursor-wait" : "";
    const errorClass    = error ? "border-red-300 placeholder:text-red-500 ring-red-300 focus:ring-red-500 focus:border-red-500" : "";

    return (
        <input
            id={ id }
            name={ name }
            type={ type }
            placeholder={ placeholder }
            ref={ ref }
            disabled={ disabled }
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 ${ disabledClass } ${ errorClass }`}
        />
    )
})
