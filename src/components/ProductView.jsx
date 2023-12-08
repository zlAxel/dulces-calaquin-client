
import { formatPrice } from "../helpers";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/20/solid";
import { ButtonApp } from "./utility/ButtonApp";
import { updateProductAvailable } from "../data/products";
import { useState } from "react";
import { Spinner } from "./utility/Spinner";
import { useApp } from "../hooks/useApp";

export const ProductView = ({product}) => {

    const [loading, setLoading] = useState(false); // Estado del loading
    const { handleNotification } = useApp(); // * Función para mostrar notificaciones

    const handleAlterAvailable = async (available) => {
        
        setLoading(true); // Activamos el loading

        const data = await updateProductAvailable(product.id, available).catch(console.log);

        setLoading(false); // Desactivamos el loading
        product.available = available; // Actualizamos el estado del producto
        
        // ? Mostramos notificación
        handleNotification('Estatus alterado', data, 'success', 10000);
    };

    return (
        <tr>
            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                <div className="flex items-center">
                    <div className="h-11 w-11 flex-shrink-0">
                        <img className="h-11 w-11 object-cover" src={product.image} alt={`Producto ${product.name}`} />
                    </div>
                    <div className="ml-4">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="hidden mt-1 text-gray-500 md:block">{product.description}</div>
                    </div>
                </div>
            </td>
            <td className="hidden px-3 py-5 text-sm text-gray-500 sm:table-cell">
                <div className="text-gray-900">${formatPrice(product.price)}</div>
            </td>
            <td className="hidden px-3 py-5 text-sm text-gray-500 md:table-cell">
                {product.updated_at}
            </td>
            <td className="px-3 py-5 text-sm text-gray-500">
                { product.available ? (
                    <button type="button" onClick={() => handleAlterAvailable(0)} className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        Activo { loading && <Spinner className="text-black mr-0 ml-2 !w-3 !h-3" /> }
                    </button>
                ) : (
                    <button type="button" onClick={() => handleAlterAvailable(1)} className="inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-600/20">
                        Inactivo { loading && <Spinner className="text-black mr-0 ml-2 !w-3 !h-3" /> }
                    </button>
                ) }
            </td>
            <td className="relative py-5 pl-3 pr-4 text-sm font-medium">
                <div className="flex gap-4 justify-center">
                    <ButtonApp 
                        content=""
                        type="button"
                        appearance="secondary"
                        icon={ <ArrowPathIcon className="relative w-5 h-5" /> }
                        onClick={ () => setToggleProductsModal(true) }
                        className="[&>span>svg]:hover:animate-spin [&>span>svg]:hover:animate-once"
                    />
                    <ButtonApp 
                        content=""
                        type="button"
                        appearance="secondary"
                        icon={ <TrashIcon className="relative w-5 h-5" /> }
                        onClick={ () => setToggleProductsModal(true) }
                        className="[&>span>svg]:hover:animate-wiggle-more"
                    />
                </div>
            </td>
        </tr>
    )
}
