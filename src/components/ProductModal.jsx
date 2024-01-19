
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowRightCircleIcon, CurrencyDollarIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon, PhotoIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { ProductOptionAvailable } from './ProductOptionAvailable'
import { ButtonApp } from './utility/ButtonApp'
import { useApp } from '../hooks/useApp'
import { getProductById, saveProduct, updateProduct } from '../data/products'
import { FormError } from './FormError'
import { mailingLists } from '../data'

export const ProductModal = ({open, setOpen}) => {

    // ? Definimos las referencias del formulario
    const name        = useRef(null);
    const price       = useRef(null);
    const description = useRef(null);
    const image       = useRef(null);

    // ? Definimos los errores del formulario
    const [nameError, setNameError] = useState(null);
    const [priceError, setPriceError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null); 
    const [imageError, setImageError] = useState(null);

    const [imageName, setImageName] = useState('');             // Estado para el nombre de la imagen
    const [imagePreview, setImagePreview] = useState(null);     // Estado para la vista previa de la imagen
    const [loadingButton, setLoadingButton] = useState(false);  // Estado para el botón de guardar producto
    
    const { availableOptionProduct, setAvailableOptionProduct, handleNotification, handleGetAllProducts, updateProductID } = useApp();

    useEffect(() => {
        if ( updateProductID ) {
            getProductById(updateProductID).then( response => {
                // console.log(response);

                // ? Asignamos los valores a los campos del formulario
                name.current.value           = response[0].name;
                description.current.value    = response[0].description;
                price.current.value          = response[0].price;
                setAvailableOptionProduct(mailingLists[ response[0].available === 1 ? 0 : 1 ]);
                setImagePreview(response[0].image);
            }).catch( () => {
                console.log('Operación cancelada [Editar producto]');
            });
        }
    }, [updateProductID])
    
    
    // ? Función para guardar el producto
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingButton(true);

        // ? Creamos el objeto con los datos del formulario
        const formData = new FormData();

        formData.append('name', name.current.value);
        formData.append('description', description.current.value);
        formData.append('price', price.current.value);
        formData.append('available', availableOptionProduct.value);

        if ( image.current.files[0] ) {
            formData.append('image', image.current.files[0]);
        }
        
        if ( updateProductID ) {
            formData.append('_method', 'PATCH');

            // ? Actualizamos el producto en la API
            await updateProduct( formData, updateProductID ).then( response => {
                handleNotification('Producto actualizado', response, 'success', 10000);     // Mostramos notificación
                handleClose();                                                              // Cerramos el modal
                handleGetAllProducts();                                                     // Actualizamos la lista de productos
            }).catch( error => {
                handleErrors(error.response.data.errors);
            });
        }else{
            // ? Guardamos el producto en la API
            await saveProduct( formData ).then( response => {
                handleNotification('Producto creado', response, 'success', 10000);      // Mostramos notificación
                handleClose();                                                          // Cerramos el modal
                handleGetAllProducts();                                                 // Actualizamos la lista de productos
            }).catch( error => {
                handleErrors(error.response.data.errors);
            });
        }

        setLoadingButton(false);   // Desactivamos el botón de guardar producto
    };

    // ? Función para asignar el nombre de la imagen
    const handleImageChange = (e) => {
        if ( e.target.files[0] ) {
            let imageName = e.target.files[0].name;
            // Recortamos el nombre de la imagen si es muy largo
            if ( imageName.length > 20 ) {
                imageName = imageName.substr(0, 20) + '...';
            }
            // Asignamos el nombre de la imagen
            setImageName( imageName );
        }
    };

    // ? Función para asignar los errores a los states
    const handleErrors = (errors) => {
        setNameError( errors.name ? errors.name[0] : null );
        setPriceError( errors.price ? errors.price[0] : null );
        setDescriptionError( errors.description ? errors.description[0] : null );
        setImageError( errors.image ? errors.image[0] : null );
    };

    // ? Función para cerrar el modal
    const handleClose = () => {
        setOpen(false);     // Cerramos el modal
        setImageName('');   // Limpiamos el nombre de la imagen
        handleErrors({});   // Limpiamos los errores
        setImagePreview(null);  // Limpiamos la vista previa de la imagen
    };

    return (
        <Transition.Root show={open} as={Fragment} appear>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                    <div className="relative">
                        <button type='button' onClick={ () => handleClose() } className='absolute right-6 top-3 cursor-pointer'>
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
                    <form onSubmit={(e) => handleSubmit(e)} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 pt-4">
                        <div className="px-8 py-6">
                            <div className="grid max-w-2xl grid-cols-4 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {/* // TODO | Nombre */}
                                <div className="col-span-full sm:col-span-4">
                                    <label htmlFor="product" className="flex items-center gap-1 text-sm font-medium leading-6 text-gray-900">
                                        <ArrowRightCircleIcon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                                        Nombre del producto
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="product"
                                                id="product"
                                                ref={name}
                                                className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Nombre del producto"
                                            />
                                        </div>
                                    </div>
                                    <FormError error={ nameError } />
                                </div>
                                {/* // TODO | Costo */}
                                <div className="col-span-full sm:col-span-2">
                                    <label htmlFor="price" className="flex items-center gap-1 text-sm font-medium leading-6 text-gray-900">
                                        <CurrencyDollarIcon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                                        Costo
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 sm:max-w-md">
                                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$</span>
                                            <input
                                                type="text"
                                                name="price"
                                                id="price"
                                                ref={price}
                                                className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="499.00"
                                            />
                                        </div>
                                    </div>
                                    <FormError error={ priceError } />
                                </div>
                                {/* // TODO | Descripción */}
                                <div className="col-span-full">
                                    <label htmlFor="description" className="flex items-center gap-1 text-sm font-medium leading-6 text-gray-900">
                                        <InformationCircleIcon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                                        Descripción del producto
                                    </label>
                                    <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        ref={description}
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                    </div>
                                    <FormError error={ descriptionError } />
                                </div>
                                {/* // TODO | Disponible */}
                                <div className="col-span-full">
                                    <ProductOptionAvailable />
                                </div>
                                {/* // TODO | Imagen */}
                                <div className="col-span-2">
                                    <p htmlFor="photo" className="flex items-center gap-1 text-sm font-medium leading-6 text-gray-900">
                                        <PhotoIcon className="h-4 w-4 text-primary-500" aria-hidden="true" />
                                        Imagen del producto
                                    </p>
                                    { imagePreview && (
                                            <div className="overflow-hidden my-4">
                                                <img
                                                    src={imagePreview}
                                                    alt={`Imagen de ${imagePreview}`}
                                                    className="w-40 h-40 sm:w-36 sm:h-36 object-cover object-center select-none"
                                                />
                                            </div>
                                        )
                                    }
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <label
                                            htmlFor="file-upload"
                                            className="rounded-md cursor-pointer bg-white px-6 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                            { ! imageName ? (
                                                    <span>Subir imagen</span>
                                                ) : (
                                                    <span>{ imageName }</span>
                                                )
                                            }
                                            <input 
                                                id="file-upload" 
                                                name="file-upload" 
                                                ref={image} 
                                                onChange={ (e) => handleImageChange(e) }
                                                type="file" 
                                                className="sr-only" 
                                                accept='image/*' 
                                            />
                                        </label>
                                    </div>
                                    <FormError error={ imageError } />
                                </div>
                                <div className="col-span-4 flex items-end gap-4 justify-end">
                                    <ButtonApp
                                        content="Cancelar"
                                        type="button"
                                        appearance="secondary"
                                        size="md"
                                        icon={ <XCircleIcon className="relative w-4 h-4 mr-2" /> }
                                        onClick={ () => handleClose() }
                                    />
                                    <ButtonApp
                                        content="Guardar producto"
                                        type="submit"
                                        appearance="primary"
                                        size="md"
                                        isLoading={ loadingButton }
                                        icon={ <BookmarkIcon className="relative w-4 h-4 mr-2" /> }
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Dialog.Panel>
            </Transition.Child>
            </div>
        </Dialog>
        </Transition.Root>
    )
}
