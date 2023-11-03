

import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { toast } from 'sonner';

export const Notification = ({ title, message, type, toastAction }) => {
    
    const attributes = {
        'success': {
            'icon': <CheckCircleIcon className={`h-6 w-6 mt-1 text-primary-800`} aria-hidden="true" />,
            'dot-color-1': 'fill-primary-200',
            'dot-color-2': 'fill-primary-400',
            'dot-color-3': 'fill-primary-600',
        },
        'error': { 
            'icon': <XCircleIcon className={`h-6 w-6 mt-1 text-red-600`} aria-hidden="true" />,
            'dot-color-1': 'fill-red-200',
            'dot-color-2': 'fill-red-400',
            'dot-color-3': 'fill-red-600',
        },
        'warning': { 
            'icon': <ExclamationTriangleIcon className={`w-5 h-5 mt-1 text-amber-600`} aria-hidden="true" />,
            'dot-color-1': 'fill-amber-200',
            'dot-color-2': 'fill-amber-400',
            'dot-color-3': 'fill-amber-600',
        },
        'info': {
            'icon': <ExclamationCircleIcon className={`h-6 w-6 mt-1 text-sky-600`} aria-hidden="true" />,
            'dot-color-1': 'fill-sky-200',
            'dot-color-2': 'fill-sky-400',
            'dot-color-3': 'fill-sky-600',
        },
    };

    return (
        <div className="py-4 px-6 bg-white border rounded-md shadow-lg">
            <div className="flex items-start">
                <div className="flex-shrink-0 ">
                    { attributes[type]['icon'] }
                </div>
                <div className="flex-1 ml-4">
                    <h1 className="text-sm text-gray-800 font-medium">
                        {title}
                    </h1>
                    <p className="text-sm mt-1">
                        {message}
                    </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                    <button onClick={() => toast.dismiss(toastAction)} >
                        <span className="sr-only">Cerrar notificación</span>
                        <span className="inline-flex gap-x-2 relative -top-2">
                            <svg className={`h-1.5 w-1.5 ${attributes[type]['dot-color-1']}`} viewBox="0 0 6 6" aria-hidden="true">
                                <circle cx={3} cy={3} r={3} />
                            </svg>
                            <svg className={`h-1.5 w-1.5 ${attributes[type]['dot-color-2']}`} viewBox="0 0 6 6" aria-hidden="true">
                                <circle cx={3} cy={3} r={3} />
                            </svg>
                            <svg className={`h-1.5 w-1.5 ${attributes[type]['dot-color-3']}`} viewBox="0 0 6 6" aria-hidden="true">
                                <circle cx={3} cy={3} r={3} />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

