
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { XCircleIcon, MinusIcon, PlusIcon, CubeIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import { formatPrice } from "../helpers"
import { useApp } from "../hooks/useApp";
import { ButtonApp } from "./utility/ButtonApp"

export const ProductMain = ({product}) => {

    const { handleProductAmount, handleAddToCart, handleDeleteProduct } = useApp();
    const inputRef = useRef(null);

    // ? Función para modificar las piezas de un producto
    const handleAmountChange = (value) => {
        const productId = inputRef.current.dataset.productId;
        handleProductAmount( productId, value );
    };
    
    // ? Función para agregar un producto al carrito
    const addProduct = (product) => {
        // ? Agregamos el producto al carrito
        handleAddToCart(product, 1);
    };

    // ? Función para eliminar un producto del carrito
    const deleteProduct = (id) => {
        // ? Eliminamos el producto del carrito
        handleDeleteProduct(id);
    };

    const [ animationProducts ] = useAutoAnimate(); // * Animación de los productos

    return (
        <article ref={animationProducts} key={product.id} onClick={ () => { if( product.isCart ) return; addProduct(product)} } className={`group relative border-0 sm:border-b sm:border-r border-gray-200 p-4 py-12 sm:p-12 hover:bg-gray-50 ${ product.isCart ? 'bg-gray-50 hover:bg-gray-100 !cursor-default' : '' } transition-colors cursor-pointer`}>
            <div className="w-full flex justify-center overflow-hidden rounded-lg">
                <img
                    src={product.image}
                    alt={`Imagen de ${product.imageAlt}`}
                    className="w-36 h-36 sm:w-28 sm:h-28 object-cover object-center select-none"
                />
            </div>
            <div className="pt-5 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                </h3>
                <div className="mt-0 flex flex-col items-center">
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900">${formatPrice(product.price)}</p>
                {product.isCart && (
                    <ButtonApp 
                        content=""
                        type="button"
                        appearance="secondary"
                        icon={ <XCircleIcon className="relative w-7 h-7" /> }
                        onClick={ () => deleteProduct( product.id ) }
                        className="mt-6 !w-12 !p-2 !absolute !-top-4 !right-2"
                    />
                )}
                <div ref={animationProducts}>
                    {product.isCart && (
                        <div className="text-gray-500 flex justify-center items-center gap-2 pt-6 relative top-5">
                            <MinusIcon onClick={ () => { if( product.amount <= 1 ) return; handleAmountChange( product.amount - 1 ) } } className="w-4 h-4 cursor-pointer hover:text-primary-600 transition-colors" />
                            <input
                                type="number"
                                className="border-0 w-6 p-0 text-sm bg-transparent select-none focus:ring-0 text-center text-gray-900 "
                                onChange={ (e) => { handleAmountChange( parseInt(e.target.value) ) } }
                                value={product.amount}
                                min={1}
                                ref={inputRef}
                                data-product-id={product.id}
                            />
                            <PlusIcon onClick={ () => { handleAmountChange( product.amount + 1 ) } } className="w-4 h-4 cursor-pointer hover:text-primary-600 transition-colors" />
                            <div className="absolute -top-1 flex items-center gap-1">
                                <p className="text-sm text-gray-500 font-semibold">Pz</p>
                                <CubeIcon className="w-4 h-4 text-primary-500" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}
