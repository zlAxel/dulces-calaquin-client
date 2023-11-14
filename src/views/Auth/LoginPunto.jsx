
import { Link, useNavigate } from "react-router-dom"

import { emailRef, pinRef, emailForm, pinForm } from "../../forms/login_punto"
import { Button } from "../../components/utility/Button";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ExclamationTriangleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ButtonInside } from "../../components/utility/ButtonInside";
import { useApp } from "../../hooks/useApp";
import { InputText } from "../../components/utility/InputText";
import { AlertModal } from "../../components/AlertModal";
import { useAutoAnimate } from '@formkit/auto-animate/react';


export const LoginPunto = () => {

    const navigate = useNavigate(); // * Navegación entre rutas

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
    const { login_punto, setTitle, searchUser } = useAuth();
    const { alerts, setAlerts, toggleModal, setToggleModal } = useApp();

    // ? Cambiamos el título de la página
    useEffect(() => {
        setTitle('Iniciar sesión');
    }, [])

    // ? Función para enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ? Si el usuario existe ejecutamos la función para iniciar sesión
        if( userFind ){

            // ? Obtenemos los valores de los inputs
            const datos = {
                email: emailRef.current.value,
                pin: pinRef.current.value,
                remember: false,
                login_type: 'login_punto',
            };
    
            setIsLoading(true); // * Activamos el loader
            setButtonText( buttonValues['loading'] ); // * Cambiamos el texto del botón
    
            // ? Iniciamos sesión
            await login_punto( datos );
    
            setIsLoading(false); // * Desactivamos el loader
            setButtonText( buttonValues['initial'] ); // * Cambiamos el texto del botón

        }
    }

    // ? Función para buscar el usuario
    const handleSearch = async () => {
        const email = emailRef.current.value;

        setIsLoadingSearch(true); // * Activamos el loader

        // ? Creamos el objeto con el email
        const datos = {
            email: email,
        };

        // ? Buscamos el usuario
        const userExists = await searchUser( datos );
        if( userExists ){
            setUserFind( userExists.data );
            setAlerts([]);

            setTimeout(() => {
                pinRef.current.focus(); // * Enfocamos el input del pin
            }, 100);
        }
        // ? Si el usuario no existe, mostramos el modal para crear una cuenta
        if( userExists && userExists.data === false )
            setToggleModal( true ); // * Mostramos el modal
        
        // ? Si hay error y el usuario no existe, definimos falso el usuario
        if( alerts[0] && ! userExists ){
            setUserFind( false );
        }

        setIsLoadingSearch(false); // * Desactivamos el loader
    };

    const handleCreateAccount = () => {
        setToggleModal( false ); // * Ocultamos el modal
        setTimeout(() => {
            navigate('/auth/register'); // * Redireccionamos a la página de registro
        }, 300);
    };

    const [animationParent] = useAutoAnimate(); // * Animación del formulario

    return (
        <>
            <AlertModal
                title="Cuenta no encontrada"
                message="No se encontró ninguna cuenta con el correo electrónico ingresado ¿Deseas crear una cuenta?"
                actionButtonText="Crear cuenta"
                toggleModal={ toggleModal }
                setToggleModal={ setToggleModal }
                actionButton={ handleCreateAccount }
                type="info"
            />
            <form ref={animationParent} onSubmit={ handleSubmit } noValidate className="space-y-6 mt-6">
                <div>
                    <label htmlFor={ emailForm.name } className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-800 pl-2">
                        { emailForm.icon }
                        { emailForm.label }
                    </label>
                    <div className="relative mt-2 flex items-center">
                        <InputText
                            id={ emailForm.name }
                            name={ emailForm.name }
                            type={ emailForm.type }
                            placeholder={ emailForm.placeholder }
                            ref={ emailForm.ref }
                            disabled={ isLoadingSearch || isLoading }
                            error={ alerts[0] }
                            autoComplete="new-password"
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
                    {
                        alerts[0] && (
                            <p className="mt-3 ml-2 text-xs text-slate-700 flex items-center gap-2" id="email-error">
                                <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
                                { alerts[0] }
                            </p>
                        )
                    }
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
                                <InputText
                                    id={ pinForm.name }
                                    name={ pinForm.name }
                                    type={ pinForm.type }
                                    placeholder={ pinForm.placeholder }
                                    ref={ pinForm.ref }
                                    disabled={ isLoading }
                                    error={ alerts[0] }
                                    autoComplete="new-password"
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

