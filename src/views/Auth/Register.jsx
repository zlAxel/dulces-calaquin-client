import { useState } from "react";
import { Link } from "react-router-dom"
import { Alert } from "../../components/Alert";
import { Button } from "../../components/utility/Button";

import registerForm, { nameRef, emailRef, passwordRef, passwordConfirmationRef, pinRef } from "../../forms/register"

import { useApp } from "../../hooks/useApp";
import { useAuth } from "../../hooks/useAuth";

export const Register = () => {

    // ? Obtenemos las alertas del context
    const { alerts } = useApp();
    
    // ? Creamos los states
    const [isLoading, setIsLoading] = useState(false);

    const buttonValues = {
        initial: "Registrar usuario",
        loading: "Registrando usuario...",
    };
    const [buttonText, setButtonText] = useState( buttonValues['initial'] );

    // ? Obtenemos la función para registrar un usuario
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ? Obtenemos los valores de los inputs
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            
        };

        setIsLoading(true); // * Activamos el loader
        setButtonText( buttonValues['loading'] ); // * Cambiamos el texto del botón

        // ? Registramos al usuario
        await register( datos );

        setIsLoading(false); // * Desactivamos el loader
        setButtonText( buttonValues['initial'] ); // * Cambiamos el texto del botón
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 pt-6 py-12 shadow sm:rounded-lg sm:px-12">
                        { alerts.length > 0 && (
                            <Alert />
                        )}
                        <form onSubmit={ handleSubmit } noValidate className="space-y-6 mt-6">
                            {
                                registerForm.map((input, index) => (
                                    <div key={ index }>
                                        <label htmlFor={ input.name } className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-800 pl-2">
                                            { input.icon }
                                            { input.label }
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id={ input.name }
                                                name={ input.name }
                                                type={ input.type }
                                                placeholder={ input.placeholder }
                                                ref={ input.ref }
                                                autoComplete={ input.autoComplete }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                            
                            <div>
                                <Button 
                                    content={ buttonText }
                                    type="submit"
                                    appearance="primary"
                                    isLoading={ isLoading }
                                    disabled={ isLoading }
                                    className="mt-10"
                                />
                            </div>
                        </form>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

