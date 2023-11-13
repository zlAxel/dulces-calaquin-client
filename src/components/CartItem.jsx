
import { CheckCircleIcon, MinusIcon, PlusIcon, TrashIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React, { useRef, useState } from 'react'
import { useApp } from '../hooks/useApp';

export const CartItem = ({ product }) => {

    const { handleProductAmount, handleDeleteProduct } = useApp();
    const [amount, setAmount] = useState(product.amount);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const inputRef = useRef(null);


    // ? Función para modificar las piezas de un producto
    const handleAmountChange = (value) => {
        setAmount(value);

        const productId = inputRef.current.dataset.productId;
        handleProductAmount( productId, value );
    };

    // ? Función para eliminar un producto del carrito
    const handleCartDeleteProduct = ( id ) => {
        handleDeleteProduct( id );
    };

    const handleConfirmDeleteProduct = () => {
        setDeleteProduct( true );
    };
    

    return (
        <li key={product.id} className="flex py-3 hover:bg-gray-50 transition-colors">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden ">
                <img
                    src={product.imageUrl}
                    alt={`Imagen de ${product.name}`}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="ml-2 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            {product.name}
                        </h3>
                        <p className="ml-4">${product.price}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">{product.description}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500 flex items-center gap-2">
                        <MinusIcon onClick={ () => { if( amount <= 1 ) return; handleAmountChange( amount - 1 ) } } className="w-4 h-4 cursor-pointer hover:text-primary-600 transition-colors" />
                        <input
                            type="number"
                            className="border-0 w-6 p-0 text-sm bg-transparent select-none focus:ring-0 text-center text-gray-900 "
                            onChange={ (e) => { handleAmountChange( parseInt(e.target.value) ) } }
                            value={amount}
                            min={1}
                            ref={inputRef}
                            data-product-id={product.id}
                        />
                        <PlusIcon onClick={ () => { handleAmountChange( amount + 1 ) } } className="w-4 h-4 cursor-pointer hover:text-primary-600 transition-colors" />
                    </p>
                    <div className="flex">
                        {
                            deleteProduct ? (
                                <div className='flex items-center'>
                                    <span className='pr-2 text-gray-700'>
                                        ¿Eliminar producto?
                                    </span>
                                    <button type="button" className="font-medium text-primary-600 hover:text-primary-500">
                                        <span className="sr-only">Cancelar eliminado del producto</span>
                                        <XCircleIcon onClick={ () => { setDeleteProduct( false ) } } className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                    <button type="button" className="font-medium text-primary-600 hover:text-primary-500 ml-1">
                                        <span className="sr-only">Eliminar producto</span>
                                        <CheckCircleIcon onClick={ () => { handleCartDeleteProduct( product.id ) } } className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={ () => { handleConfirmDeleteProduct() } }
                                    type="button"
                                    className="font-medium text-primary-600 hover:text-primary-500"
                                    >
                                    <span className="sr-only">Eliminar producto</span>
                                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </li>
    )
}

