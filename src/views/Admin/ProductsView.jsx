import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ProductModal } from "../../components/ProductModal";
import { ProductView } from "../../components/ProductView";
import { ButtonApp } from "../../components/utility/ButtonApp";
import { useApp } from "../../hooks/useApp";

export const ProductsView = () => {

    const [toggleModalProduct, setToggleModalProduct] = useState(false); // ? Estado para mostrar/ocultar el modal de productos

    const { productsAll } = useApp(); // ? Obtenemos los productos del Provider

    return (
        <div className="mt-5 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex items-center text-center sm:text-start">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Productos
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Aquí podrás administrar tus productos del sistema.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <ButtonApp 
                        content="Agregar producto"
                        type="button"
                        appearance="primary"
                        icon={ <SquaresPlusIcon className="relative w-5 h-5 mr-2" /> }
                        onClick={ () => setToggleModalProduct(true) }
                    />
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Nombre
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Precio
                                        </th>
                                        <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">
                                            Última actualización
                                        </th>
                                        <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                                            Estatus
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-sm font-semibold text-gray-900">
                                            <span className="sr-only">Acciones</span>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {productsAll.map((product) => (
                                        <ProductView key={product.id} product={product} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ProductModal open={toggleModalProduct} setOpen={setToggleModalProduct} />
      </div>
    )
}
