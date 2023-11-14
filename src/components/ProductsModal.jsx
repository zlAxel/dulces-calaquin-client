
import { Fragment, useRef, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, MinusIcon, SparklesIcon } from '@heroicons/react/20/solid'
import { FaceFrownIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { ButtonApp } from './utility/ButtonApp'
import { useApp } from '../hooks/useApp'
import { useEffect } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const ProductsModal = ({open, setOpen}) => {
    const [query, setQuery] = useState('');
    const [recent, setRecent] = useState([]);
    const [amount, setAmount] = useState(1);
    const queryRef = useRef(null);
    const { products, handleNotification, cart, setCart } = useApp();

    // useEffect(() => {
    //     if ( Object.values(products).length === 0 ) return;
    //     // setRecent([products[0], products[1]]);
    //     setRecent([]);
    // }, [products])
    
    useEffect(() => {
        if ( ! open ) return;
        setTimeout(() => {
            queryRef.current.focus();
        }, 400);
    }, [open])

    const filteredProducts =
        query === ''
        ? []
        : products.filter((product) => {
            return product.name.toLowerCase().includes(query.toLowerCase())
        });

    const handleAddToCart = (productActive) => {
        // ? Creamos el objeto con la cantidad
        const productFinal = { ...productActive, amount };

        // ? Antes de agregar el producto a la lista de recientes, verificamos que no esté ya en la lista
        const isRecent = recent.find( product => product.id === productFinal.id );
        if ( ! isRecent ) setRecent([productFinal, ...recent]);

        // ? Antes de agregar el producto al carrito, verificamos que no esté ya en el carrito, si está, sumamos la cantidad
        const isCart = cart.find( product => product.id === productFinal.id );
        if ( isCart ) {
            const newCart = cart.map( product => {
                if ( product.id === productFinal.id ) {
                    product.amount += productFinal.amount;
                    return product;
                }
                return product;
            });
            // ? Agregamos el producto al carrito
            setCart(newCart);
        }else{
            // ? Agregamos el producto al carrito
            setCart( cart => [...cart, productFinal] );
        }

        // ? Mostramos notificación
        handleNotification('Producto agregado', 'Agregaste correctamente tu producto al carrito.', 'success', 10000);

        // ? Agregamos el producto al carrito
        setQuery('');
        queryRef.current.focus();
        setAmount(1);
    };

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
                <Combobox>
                    {({ activeOption }) => (
                    <>
                        <div className="relative">
                            <MagnifyingGlassIcon
                                className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-primary-400"
                                aria-hidden="true"
                            />
                            {/* <Combobox.Input */}
                            <input
                                className="h-12 w-full border-0 bg-transparent pl-12 pr-4 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm"
                                placeholder="Buscar productos..."
                                value={query}
                                onChange={ (event) => setQuery(event.target.value) }
                                ref={queryRef}
                            />
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

                        {(query === '' || filteredProducts.length > 0) && (
                        <Combobox.Options as="div" static hold className="flex transform-gpu divide-x divide-gray-100">
                            <div
                                className={classNames(
                                    'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                                    activeOption && 'sm:h-96'
                                )}
                                >
                                {(query === '' && Object.values(recent).length > 0) && (
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
                                    {(query === '' && Object.values(recent).length === 0) && (
                                        <div className="px-6 py-14 text-center text-sm sm:px-14">
                                            <SparklesIcon className="mx-auto h-7 w-7 text-primary-500" aria-hidden="true" />
                                            <p className="mt-4 font-semibold text-gray-900">Comienza a buscar</p>
                                            <p className="mt-4 text-gray-500">
                                                Encuentra tus productos favoritos usando  <br />
                                                <span className='from-gray-800 font-semibold'>
                                                    el buscador.
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {activeOption && (
                            <div className="hidden w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                                <div className="flex-none p-6 text-center">
                                <img src={activeOption.imageUrl} alt="" className="mx-auto h-16 w-16 rounded-full" />
                                <h2 className="mt-3 font-semibold text-gray-900">{activeOption.name}</h2>
                                <p className="text-sm leading-6 text-gray-500">${activeOption.price}</p>
                                </div>
                                <div className="flex flex-auto flex-col p-6">
                                <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-gray-700">
                                    <dt className="col-end-2 font-semibold text-gray-900">Detalles</dt>
                                    <dd>{activeOption.description}</dd>
                                    <dt className="col-end-2 mt-2 font-semibold text-gray-900">Cantidad</dt>
                                    <dd className='flex items-center w-fit '>
                                        <MinusIcon onClick={ () => { if( amount <= 1 ) return; setAmount( amount - 1 ) } } className="w-4 h-4 cursor-pointer hover:text-primary-600 transition-colors" />
                                        <input
                                            type="number"
                                            className="border-0 w-12 text-sm bg-transparent select-none focus:ring-0 text-center text-gray-900 "
                                            onChange={ (e) => { setAmount( parseInt(e.target.value) ) } }
                                            value={amount}
                                            min={1}
                                        />
                                        <PlusIcon onClick={ () => { setAmount( amount + 1 ) } } className="w-4 h-4 cursor-pointer hover:text-primary-600 transition-colors" />
                                    </dd>
                                    {/* <dt className="col-end-1 font-semibold text-gray-900">Contenido</dt>
                                    <dd className="truncate">
                                        {activeOption.url}
                                    </dd>
                                    <dt className="col-end-1 font-semibold text-gray-900">Restantes</dt>
                                    <dd className="truncate">
                                        {activeOption.email}
                                    </dd> */}
                                </dl>
                                <ButtonApp 
                                    content={`Agregar ${ ! isNaN(amount) ? amount : '' } al carrito`}
                                    type="button"
                                    appearance="primary"
                                    icon={ <ShoppingCartIcon className="relative w-5 h-5 mr-2" /> }
                                    className="mt-10"
                                    onClick={ () => handleAddToCart( activeOption ) }
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
