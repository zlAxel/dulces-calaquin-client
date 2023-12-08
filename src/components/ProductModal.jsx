
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowRightCircleIcon, CurrencyDollarIcon, InformationCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon, PhotoIcon } from '@heroicons/react/20/solid'
import { ProductOptionAvailable } from './ProductOptionAvailable'
import { ButtonApp } from './utility/ButtonApp'

export const ProductModal = ({open, setOpen}) => {

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
                <Dialog.Panel className="mx-auto h-fit max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                    <div className="relative">
                        <button type='button' onClick={ () => setOpen(false) } className='absolute right-6 top-3 cursor-pointer'>
                            <span className="inline-flex items-center gap-x-2">
                                <svg className="h-2 w-2 fill-primary-200" viewBox="0 0 6 6" aria-hidden="true">
                                    <circle cx={3} cy={3} r={3} />
                                </svg>
                                <svg className="h-2 w-2 fill-primary-400" viewBox="0 0 6 6" aria-hidden="true">
                                    <circle cx={3} cy={3} r={3} />
                                </svg>
                                <svg className="h-2 w-2 fill-primary-600" viewBox="0 0 6 6" aria-hidden="true">
                                    <circle cx={3} cy={3} r={3} />
                                </svg>
                            </span>
                        </button>
                    </div>
                    <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 pt-4">
                        <div className="px-4 py-6 sm:p-8">
                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {/* // TODO | Nombre */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="product" className="flex items-center gap-1 text-sm font-medium leading-6 text-gray-900">
                                        <ArrowRightCircleIcon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                                        Nombre del producto
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="product"
                                                id="product"
                                                className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Nombre del producto"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* // TODO | Costo */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="price" className="flex items-center gap-1 text-sm font-medium leading-6 text-gray-900">
                                        <CurrencyDollarIcon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                                        Costo
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 sm:max-w-md">
                                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$</span>
                                            <input
                                                type="text"
                                                name="price"
                                                id="price"
                                                className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="499.00"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* // TODO | Descripción */}
                                <div className="col-span-full">
                                    <label htmlFor="description" className="flex items-center gap-1 text-sm font-medium leading-6 text-gray-900">
                                        <InformationCircleIcon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                                        Descripción del producto
                                    </label>
                                    <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                    </div>
                                    <p className="flex items-center gap-1 mt-1 ml-2 text-xs leading-6 text-gray-500">
                                        <QuestionMarkCircleIcon className="h-3 w-3 text-gray-600" aria-hidden="true" />
                                        Escriba una descripción corta sobre su producto.
                                    </p>
                                </div>
                                <div className="col-span-full">
                                    <ProductOptionAvailable />
                                </div>
                                <div className="col-span-2">
                                    <p htmlFor="photo" className="flex items-center gap-1 text-sm font-medium leading-6 text-gray-900">
                                        <PhotoIcon className="h-4 w-4 text-primary-500" aria-hidden="true" />
                                        Imagen del producto
                                    </p>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <label
                                            htmlFor="file-upload"
                                            className="rounded-md cursor-pointer bg-white px-6 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                            <span>Subir imagen</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                    </div>
                                </div>
                                <div className="col-span-4 flex items-end justify-end">
                                    <ButtonApp
                                        content="Agregar producto"
                                        type="button"
                                        appearance="primary"
                                        icon={ <BookmarkIcon className="relative w-5 h-5 mr-2" /> }
                                        onClick={ () => setToggleModalProduct(true) }
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Dialog.Panel>
            </Transition.Child>
            </div>
        </Dialog>
        </Transition.Root>
    )
}
