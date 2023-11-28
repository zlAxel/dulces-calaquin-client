
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FireIcon } from "@heroicons/react/20/solid"
import { TopProducts } from "../components/layout/TopProducts";
import { ProductsModal } from "../components/ProductsModal"
import { ButtonApp } from "../components/utility/ButtonApp"
import { useApp } from "../hooks/useApp";

export const Store = () => {

    const { toggleProductsModal, setToggleProductsModal, topProducts } = useApp();

    const [ animationProducts ] = useAutoAnimate(); // * Animación de los productos

    return (
        <div className="flex flex-col w-full justify-center items-center gap-6 my-10">
            <h1 className="bg-gradient-to-r from-gray-500 to-primary-600 bg-clip-text font-display font-semibold text-3xl tracking-tight text-transparent">
                ¿Qué se te antoja hoy?
            </h1>
            <ButtonApp 
                content="Buscar productos"
                type="button"
                appearance="primary"
                icon={ <FireIcon className="relative w-5 h-5 mr-2" /> }
                onClick={ () => setToggleProductsModal(true) }
                className="mt-6"
            />
            <ProductsModal
                open={toggleProductsModal}
                setOpen={setToggleProductsModal}
            />

            <div ref={ animationProducts } classNamew-full>
                { topProducts.length > 0 && (
                    <TopProducts />
                )}
            </div>
        </div>
    )
}

