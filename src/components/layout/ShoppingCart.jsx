
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useApp } from '../../hooks/useApp'
import { formatPrice } from "../../helpers"
import { ButtonApp } from '../utility/ButtonApp'
import { ArrowUturnLeftIcon, BanknotesIcon, ExclamationTriangleIcon, PlusCircleIcon, SparklesIcon } from '@heroicons/react/20/solid'
import { CartItem } from '../CartItem'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../hooks/useAuth'


export const ShoppingCart = ({ cartOpen, setCartOpen }) => {

    const [confirmPayment, setConfirmPayment] = useState(false);                // * Estado para confirmar el pago ahora
    const [confirmPaylater, setConfirmPaylater] = useState(false);              // * Estado para confirmar el pago después
    const [loadingButtonPayment, setLoadingButtonPayment] = useState(false);    // * Estado para mostrar/ocultar el spinner del botón de pago

    const { 
        cart, 
        setToggleProductsModal,
        handleCreatePurchase,
        setCart,
        handleNotification,
    } = useApp();

    const { logout } = useAuth();

    // ? Función para abrir el modal de productos
    const handleAddProducts = () => {
        setCartOpen(false);
        setToggleProductsModal(true);
    };

    // ? Función para confirmar el pago (AHORA)
    const handleConfirmPayment = () => {
        setConfirmPaylater(false); // * Confirmar pago después: DESACTIVADO
        setConfirmPayment(true);   // * Confirmar pago ahora:   ACTIVADO
    };

    // ? Función para confirmar el pago (DESPUÉS)
    const handleConfirmPaylater = () => {
        setConfirmPaylater(true);  // * Confirmar pago después: ACTIVADO
        setConfirmPayment(false);  // * Confirmar pago ahora:   DESACTIVADO
    };

    // ? Función para crear la compra
    async function handleConfirmedPurchase( status ) {
        setLoadingButtonPayment(true); 

        const response = await handleCreatePurchase( status, cart );
        if ( response ) {
            // ? Limpiamos el carrito
            setCart([]);

            // ? Cerramos el modal y los confirmadores
            setCartOpen(false);
            setConfirmPayment(false);
            setConfirmPaylater(false);

            // ? Mostramos notificación
            handleNotification(response, 'La compra se ha realizado con éxito', 'info', 5000);

            // ? Cerramos sesión
            setTimeout(() => {
                logout();
            }, 2000);
        } else {
            handleNotification('Error', 'No se pudo realizar la compra', 'error', 5000);
        }

        setLoadingButtonPayment(false);
    };

    const cartLength = cart.length; // * Obtenemos los productos del carrito

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
                                                appearance="secondary"
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
                            <div className="mt-6 flex gap-4">
                                {
                                    ! confirmPayment ? (
                                        <ButtonApp
                                            content="Pagar ahora"
                                            type="button"
                                            appearance="primary"
                                            onClick={ () => handleConfirmPayment() }
                                            disabled={ cartLength === 0 }
                                            icon={ <BanknotesIcon className="relative w-5 h-5 mr-2" /> }
                                            className="w-full"
                                        />
                                    ) : (
                                        <>
                                            <ButtonApp
                                                content="Cancelar"
                                                type="button"
                                                appearance="secondary"
                                                onClick={ () => setConfirmPayment( false ) }
                                                icon={ <XCircleIcon className="relative w-5 h-5 mr-2" /> }
                                                className="w-full"
                                            />
                                            <ButtonApp
                                                content="Confirmar compra"
                                                type="button"
                                                appearance="primary"
                                                isLoading={ loadingButtonPayment }
                                                onClick={ () => handleConfirmedPurchase('Pagado') }
                                                icon={ <CheckCircleIcon className="relative w-5 h-5 mr-2" /> }
                                                className="w-full"
                                            />
                                        </>
                                    )
                                }
                            </div>
                            <div className="mt-4 flex justify-center text-gray-500">
                            {
                                    ! confirmPaylater ? (
                                        <ButtonApp 
                                            content={`Pagar después`}
                                            type="button"
                                            appearance="secondary"
                                            disabled={ cartLength === 0 }
                                            onClick={ () => handleConfirmPaylater() }
                                            icon={ <ArrowUturnLeftIcon className="relative w-4 h-4 mr-2" /> }
                                        />
                                    ) : (
                                        <div className='flex gap-4 flex-col w-full'>
                                            <p className='flex items-center justify-center text-gray-900 text-sm font-semibold mt-5 mb-2'>
                                                <ExclamationTriangleIcon className="relative w-5 h-5 mr-2 text-primary-600" />
                                                Tendrás que pagar tu compra posteriormente.
                                            </p>
                                            <div className='flex'>
                                                <ButtonApp
                                                    content="Cancelar"
                                                    type="button"
                                                    appearance="secondary"
                                                    onClick={ () => setConfirmPaylater( false ) }
                                                    icon={ <XCircleIcon className="relative w-5 h-5 mr-2" /> }
                                                    className="w-full"
                                                />
                                                <ButtonApp
                                                    content="Confirmar"
                                                    type="button"
                                                    appearance="primary"
                                                    isLoading={ loadingButtonPayment }
                                                    onClick={ () => handleConfirmedPurchase('Pendiente') }
                                                    icon={ <CheckCircleIcon className="relative w-5 h-5 mr-2" /> }
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    )
                                }
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
