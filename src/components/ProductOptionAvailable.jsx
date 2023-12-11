import { useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { EyeIcon } from '@heroicons/react/24/outline'
import { useApp } from '../hooks/useApp'

const mailingLists = [
  { id: 1, description: 'Disponible', value: 1 },
  { id: 2, description: 'No disponible', value: 0 },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const ProductOptionAvailable = () => {

    const { availableOptionProduct, setAvailableOptionProduct } = useApp();

    useEffect(() => {
        setAvailableOptionProduct(mailingLists[0]);
    }, []); // Seleccionamos el primer elemento por defecto
    

    return (
        <RadioGroup value={availableOptionProduct} onChange={ setAvailableOptionProduct }>
            <RadioGroup.Label className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900">
                <EyeIcon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                Selecciona la disponibilidad del producto
            </RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
                {mailingLists.map((mailingList) => (
                <RadioGroup.Option
                    key={mailingList.id}
                    value={mailingList}
                    className={({ active }) =>
                    classNames(
                        active ? 'border-primary-600 ring-2 ring-primary-600' : 'border-gray-300',
                        'relative flex cursor-pointer rounded-lg border bg-white pt-2 px-3 pb-1.5 shadow-sm focus:outline-none'
                    )
                    }
                    >
                    {({ checked, active }) => (
                        <>
                            <span className="flex flex-1">
                                <span className="flex flex-col">
                                    <RadioGroup.Label as="span" className="block text-xs font-medium text-gray-900 select-none">
                                        {mailingList.description}
                                    </RadioGroup.Label>
                                </span>
                            </span>
                            <CheckCircleIcon
                                className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-primary-600')}
                                aria-hidden="true"
                            />
                            <span
                                className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-primary-600' : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden="true"
                            />
                        </>
                    )}
                </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
}
