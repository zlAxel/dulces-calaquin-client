
import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/20/solid'
import { FaceFrownIcon, ShoppingCartIcon, UsersIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { ButtonApp } from './utility/ButtonApp'

const products = [
  {
    id: 1,
    name: 'Cacahuates',
    role: '$14.00',
    details: 'Cacahuates con chile y limón, 100gr de producto.',
    url: '500gr',
    email: '5 unidades disponibles',
    profileUrl: '#',
    imageUrl:
      'https://chedrauimx.vtexassets.com/arquivos/ids/21089944/7501040072437_00.jpg?v=638338000849200000',
  },
  {
    id: 2,
    name: 'Coca-Cola',
    role: '$19.00',
    details: 'Refresco de cola, 600ml de producto.',
    url: '600ml',
    email: '10 unidades disponibles',
    profileUrl: '#',
    imageUrl:
      'https://www.coca-cola.com/content/dam/onexp/mx/es/brands/coca-cola/coca-cola-original/Product-Information-Section-Coca-Cola-Original.jpg',
  },
]

// const recent = [products[5], products[4], products[2], products[10], products[16]]
const recent = [products[0], products[1]];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const ProductsModal = ({open, setOpen}) => {
    const [query, setQuery] = useState('')

    const filteredProducts =
        query === ''
        ? []
        : products.filter((product) => {
            return product.name.toLowerCase().includes(query.toLowerCase())
        })

    return (
        <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')} appear>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                <Combobox>
                    {({ activeOption }) => (
                    <>
                        <div className="relative">
                            <MagnifyingGlassIcon
                                className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            <Combobox.Input
                                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                placeholder="Encuentra más productos..."
                                onChange={(event) => setQuery(event.target.value)}
                            />
                        </div>

                        {(query === '' || filteredProducts.length > 0) && (
                        <Combobox.Options as="div" static hold className="flex transform-gpu divide-x divide-gray-100">
                            <div
                            className={classNames(
                                'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                                activeOption && 'sm:h-96'
                            )}
                            >
                            {query === '' && (
                                <h2 className="mb-4 mt-2 text-xs font-semibold text-primary-800">Comprados recientemente</h2>
                            )}
                            <div className="-mx-2 text-sm text-gray-700">
                                {(query === '' ? recent : filteredProducts).map((product) => (
                                <Combobox.Option
                                    as="div"
                                    key={product.id}
                                    value={product}
                                    className={({ active }) =>
                                    classNames(
                                        'flex cursor-default select-none items-center rounded-md p-2',
                                        active && 'bg-gray-100 text-gray-900'
                                    )
                                    }
                                >
                                    {({ active }) => (
                                    <>
                                        <img src={product.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full" />
                                        <span className="ml-3 flex-auto truncate">{product.name}</span>
                                        {active && (
                                        <ChevronRightIcon
                                            className="ml-3 h-5 w-5 flex-none text-gray-400"
                                            aria-hidden="true"
                                        />
                                        )}
                                    </>
                                    )}
                                </Combobox.Option>
                                ))}
                            </div>
                            </div>

                            {activeOption && (
                            <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                                <div className="flex-none p-6 text-center">
                                <img src={activeOption.imageUrl} alt="" className="mx-auto h-16 w-16 rounded-full" />
                                <h2 className="mt-3 font-semibold text-gray-900">{activeOption.name}</h2>
                                <p className="text-sm leading-6 text-gray-500">{activeOption.role}</p>
                                </div>
                                <div className="flex flex-auto flex-col justify-between p-6">
                                <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                                    <dt className="col-end-1 font-semibold text-gray-900">Detalles</dt>
                                    <dd>{activeOption.details}</dd>
                                    <dt className="col-end-1 font-semibold text-gray-900">Contenido</dt>
                                    <dd className="truncate">
                                        {activeOption.url}
                                    </dd>
                                    <dt className="col-end-1 font-semibold text-gray-900">Restantes</dt>
                                    <dd className="truncate">
                                        {activeOption.email}
                                    </dd>
                                </dl>
                                <ButtonApp 
                                    content="Agregar al carrito"
                                    type="button"
                                    appearance="primary"
                                    icon={ <ShoppingCartIcon className="relative w-5 h-5 mr-2" /> }
                                    className="mt-10"
                                />
                                </div>
                            </div>
                            )}
                        </Combobox.Options>
                        )}

                        {query !== '' && filteredProducts.length === 0 && (
                        <div className="px-6 py-14 text-center text-sm sm:px-14">
                            <FaceFrownIcon className="mx-auto h-7 w-7 text-primary-500" aria-hidden="true" />
                            <p className="mt-4 font-semibold text-gray-900">Producto no encontrado</p>
                            <p className="mt-4 text-gray-500">
                                No encontramos el producto que estás buscando <br />
                                <span className='from-gray-800 font-semibold'>
                                    ¿Te gustaría solicitarlo?
                                </span>
                            </p>
                            <ButtonApp 
                                content="Solicitar producto"
                                type="button"
                                appearance="primary"
                                icon={ <SparklesIcon className="relative w-5 h-5 mr-2" /> }
                                className="mt-10"
                            />
                        </div>
                        )}
                    </>
                    )}
                </Combobox>
                </Dialog.Panel>
            </Transition.Child>
            </div>
        </Dialog>
        </Transition.Root>
    )
}
