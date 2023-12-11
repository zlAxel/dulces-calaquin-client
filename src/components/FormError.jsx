import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

export const FormError = ({ error }) => {
    if (!error) return null; // Si no hay error, no se muestra nada
    return (
        <p className="flex items-center gap-1 mt-1 ml-2 text-xs leading-6 text-red-700 ">
            <ExclamationTriangleIcon className="h-3.5 w-3.5 text-red-600" aria-hidden="true" />
            { error }
        </p>
    )
}

