import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Alert } from "../../components/Alert";
import { Button } from "../../components/utility/Button";
import { InputText } from "../../components/utility/InputText";

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
    const { register, setTitle, setSubtitle } = useAuth();

    // ? Cambiamos el título 
    useEffect(() => {
        setTitle('Registrar usuario');
        setSubtitle('Crea tu cuenta para poder agilizar tus compras y llevar un mejor control de tus pedidos.');
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ? Obtenemos los valores de los inputs
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            pin: pinRef.current.value,
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
            <form onSubmit={ handleSubmit } noValidate className="space-y-6 mt-6">
                {
                    registerForm.map((input, index) => (
                        <div key={ index }>
                            <label htmlFor={ input.name } className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-800 pl-2">
                                { input.icon }
                                { input.label }
                            </label>
                            <div className="mt-2">
                                <InputText
                                    id={ input.name }
                                    name={ input.name }
                                    type={ input.type }
                                    placeholder={ input.placeholder }
                                    ref={ input.ref }
                                    autoComplete={ input.autoComplete }
                                    disabled={ isLoading }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
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
                        className="mt-10"
                    />
                </div>
            </form>
        </>
    )
}

