
import { Link } from "react-router-dom"

import { emailRef, pinRef, emailForm, pinForm } from "../../forms/login_punto"
import { Button } from "../../components/utility/Button";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ButtonInside } from "../../components/utility/ButtonInside";
import { useApp } from "../../hooks/useApp";


export const LoginPunto = () => {

    // ? Creamos los states
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [userFind, setUserFind] = useState(false);

    const buttonValues = {
        initial: "Ingresar a la tienda",
        loading: "Ingresando...",
    };
    const [buttonText, setButtonText] = useState( buttonValues['initial'] );

    // ? Obtenemos el hook para iniciar sesión
    const { login, setTitle, searchUser } = useAuth();

    // ? Obtenemos la función para setear alertas
    const { setAlerts } = useApp();

    // ? Cambiamos el título 
    useEffect(() => {
        setTitle('Iniciar sesión');
    }, [])
    

    // ? Función para enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;

        if( ! email ){
            setAlerts(['Debes ingresar un correo electrónico.']);
            handleSearch(); // * Buscamos el usuario
            return;
        }
        
        // ? Obtenemos los valores de los inputs
        const datos = {
            email: email,
            pin: pinRef.current.value,
        };

        setIsLoading(true); // * Activamos el loader
        setButtonText( buttonValues['loading'] ); // * Cambiamos el texto del botón

        // ? Iniciamos sesión
        await login( datos );

        setIsLoading(false); // * Desactivamos el loader
        setButtonText( buttonValues['initial'] ); // * Cambiamos el texto del botón
    }

    // ? Función para buscar el usuario
    const handleSearch = async () => {
        
        setIsLoadingSearch(true); // * Activamos el loader

        // ? Creamos el objeto con el email
        const datos = {
            email: emailRef.current.value,
        };

        // ? Buscamos el usuario
        const userFind = await searchUser( datos );
        setUserFind( userFind );

        setIsLoadingSearch(false); // * Desactivamos el loader
        
    };

    return (
        <>
            <form onSubmit={ handleSubmit } noValidate className="space-y-6 mt-6">
                <div>
                    <label htmlFor={ emailForm.name } className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-800 pl-2">
                        { emailForm.icon }
                        { emailForm.label }
                    </label>
                    <div className="relative mt-2 flex items-center">
                        <input
                            id={ emailForm.name }
                            name={ emailForm.name }
                            type={ emailForm.type }
                            placeholder={ emailForm.placeholder }
                            ref={ emailForm.ref }
                            disabled={ isLoading }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                            <ButtonInside
                                content="Buscar"
                                type={ userFind ? "button" : "submit" }
                                icon={ <MagnifyingGlassIcon className="h-3 w-3 mr-1" /> }
                                appearance="primary"
                                isLoading={ isLoadingSearch }
                                onClick={ () => handleSearch() }
                            />
                        </div>
                    </div>
                </div>
                {
                userFind && (
                    <div className="flex gap-5 flex-col">
                        <div>
                            <label htmlFor={ pinForm.name } className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-800 pl-2">
                                { pinForm.icon }
                                { pinForm.label }
                            </label>
                            <div className="mt-2">
                                <input
                                    id={ pinForm.name }
                                    name={ pinForm.name }
                                    type={ pinForm.type }
                                    placeholder={ pinForm.placeholder }
                                    ref={ pinForm.ref }
                                    disabled={ isLoading }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end px-2">
                            <div className="text-sm leading-6">
                                <Link to="/auth/recover-password" className="font-semibold text-primary-600 hover:text-primary-500">
                                    ¿Olvidaste tu pin?
                                </Link>
                            </div>
                        </div>
                        <div>
                            <Button 
                                content={ buttonText }
                                type="submit"
                                appearance="primary"
                                isLoading={ isLoading }
                                disabled={ isLoading }
                            />
                        </div>
                    </div>
                )
                }
            </form>
        </>
    )
}

