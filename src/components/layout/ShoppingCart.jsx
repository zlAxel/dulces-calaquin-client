
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useApp } from '../../hooks/useApp'
import { formatPrice } from "../../helpers"
import { ButtonApp } from '../utility/ButtonApp'
import { ArrowUturnLeftIcon, BanknotesIcon, PlusCircleIcon, SparklesIcon } from '@heroicons/react/20/solid'
import { CartItem } from '../CartItem'



export const ShoppingCart = ({ cartOpen, setCartOpen }) => {

    const { 
        cart, 
        setToggleProductsModal 
    } = useApp();

    const handleAddProducts = () => {
        setCartOpen(false);
        setToggleProductsModal(true);
    };

    const cartLength = cart.length;

    return (
        <Transition.Root show={cartOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setCartOpen}>
            <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-900/50 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-300 " enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300 " leaveFrom="translate-x-0" leaveTo="translate-x-full">
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">
                    <div className="flex h-full flex-col bg-white shadow-xl"> {/* overflow-y-scroll */}
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                                <Dialog.Title className="text-lg font-medium text-gray-900 flex gap-2 flex-col">
                                    Carrito de compras
                                    <span className='text-sm font-normal text-gray-600'>
                                        Aquí puedes ver los productos que has agregado al carrito de compras.
                                    </span>
                                </Dialog.Title>
                                <div className="ml-3 flex h-7 items-center">
                                    <button type='button' onClick={ () => setCartOpen(false) } className='relative -m-2 p-2 cursor-pointer'>
                                        <span className="sr-only">Cerrar carrito de compras</span>
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
                            </div>

                            {
                                cartLength > 0 ? (
                                    <div className="mt-10">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {cart.map((product) => (
                                                    <CartItem key={product.id} product={product} />
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='h-full flex items-center justify-center relative -top-10'>
                                        <div className="px-6 py-14 text-center text-sm sm:px-14">
                                            <SparklesIcon className="mx-auto h-7 w-7 text-primary-500" aria-hidden="true" />
                                            <p className="mt-4 font-semibold text-gray-900">Tu carrito está vacío</p>
                                            <p className="mt-4 text-gray-500">
                                                Agrega tus productos favoritos y serán  <br />
                                                <span className='from-gray-800 font-semibold'>
                                                    aparecerán aquí.
                                                </span>
                                            </p>
                                            <ButtonApp 
                                                content={`Añadir productos`}
                                                type="button"
                                                appearance="primary"
                                                icon={ <PlusCircleIcon className="relative w-5 h-5 mr-2" /> }
                                                className="mt-10"
                                                onClick={ () => handleAddProducts() }
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Total</p>
                            <p>
                                { formatPrice( cart.reduce(( total, orderState ) => ( orderState.price * orderState.amount ) + total, 0 ) ) }
                            </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Suma de todos los productos seleccionados.</p>
                        <div className="mt-6">
                            <ButtonApp
                                    content="Pagar ahora"
                                    type="button"
                                    appearance="primary"
                                    icon={ <BanknotesIcon className="relative w-5 h-5 mr-2" /> }
                                    className="w-full"
                                />
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <button
                                type="button"
                                className="flex items-center font-medium text-primary-600 hover:text-primary-500"
                                onClick={() => setCartOpen(false)}
                                >
                                <ArrowUturnLeftIcon className="relative w-4 h-4 mr-2" />
                                Pagar después
                            </button>
                            
                        </div>
                        </div>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
    )
}
