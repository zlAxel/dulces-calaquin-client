import { ArrowPathIcon, TrashIcon } from "@heroicons/react/20/solid";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { ButtonApp } from "../../components/utility/ButtonApp";
import { formatPrice } from "../../helpers";
import { useApp } from "../../hooks/useApp";

export const ProductsView = () => {

    const { products } = useApp(); // ? Obtenemos los productos del Provider

    return (
        <div className="mt-5 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
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
                        onClick={ () => setToggleProductsModal(true) }
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
                                    {products.map((product) => (
                                        <tr key={product.id}>
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
                                            <td className="px-3 py-5 text-sm text-gray-500">
                                                <div className="text-gray-900">${formatPrice(product.price)}</div>
                                            </td>
                                            <td className="hidden px-3 py-5 text-sm text-gray-500 md:table-cell">
                                                04/01/2021
                                            </td>
                                            <td className="hidden px-3 py-5 text-sm text-gray-500 sm:table-cell">
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    Activo
                                                </span>
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
}
