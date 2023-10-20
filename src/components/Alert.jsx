
import { XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useApp } from '../hooks/useApp';

export const Alert = () => {

    const { alerts, setAlerts } = useApp();

    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex relative">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                        {/* Atención, tienes { alerts.length } { alerts.length === 1 ? 'error' : 'errores' }: */}
                        Atención, tienes { alerts.length === 1 ? 'una' : 'varias' } { alerts.length === 1 ? 'alerta' : 'alertas' }:
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                        <ul role="list" className="list-disc space-y-1 pl-5">
                            {
                                alerts.map((alert, index) => (
                                    <li key={ index }>
                                        { alert }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="absolute right-0 top-0">
                    <button
                        type="button"
                        className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                        onClick={ () => setAlerts([]) }
                        >
                        <span className="sr-only">Cerrar</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    )
}
