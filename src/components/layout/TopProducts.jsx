
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { formatPrice } from "../../helpers"
import { useApp } from "../../hooks/useApp";
import { ButtonApp } from "../utility/ButtonApp"

export const TopProducts = () => { 

    const { handleAddToCart, handleDeleteProduct, products } = useApp();
    
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
        <div className="mx-auto max-w-none sm:max-w-7xl overflow-hidden sm:px-6 lg:px-8 mt-20">
            <h2 className="sr-only">Products</h2>
            <div className="-mx-px grid grid-cols-1 w-full border-0 sm:border-l sm:border-t border-gray-200 sm:mx-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
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
                            {/* <div ref={animationProducts}> */}
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
                            {/* </div> */}
                        </div>
                  </article>
                ))}
            </div>
        </div>
    )
}
