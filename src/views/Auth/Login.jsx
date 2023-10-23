
import { Link } from "react-router-dom"

import loginForm, { emailRef, passwordRef, rememberRef, rememberMeForm } from "../../forms/login"
import { Button } from "../../components/utility/Button";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { UserPlusIcon } from '@heroicons/react/24/outline'
import { InputText } from "../../components/utility/InputText";


export const Login = () => {

    // ? Creamos los states
    const [isLoading, setIsLoading] = useState(false);

    const buttonValues = {
        initial: "Iniciar sesión",
        loading: "Iniciando sesión...",
    };
    const [buttonText, setButtonText] = useState( buttonValues['initial'] );

    // ? Obtenemos el hook para iniciar sesión
    const { login, setTitle } = useAuth();

    // ? Cambiamos el título 
    useEffect(() => {
        setTitle('Iniciar sesión');
    }, [])
    

    // ? Función para enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // ? Obtenemos los valores de los inputs
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            remember: rememberRef.current.checked,
            login_type: 'login',
        };

        setIsLoading(true); // * Activamos el loader
        setButtonText( buttonValues['loading'] ); // * Cambiamos el texto del botón

        // ? Iniciamos sesión
        await login( datos );

        setIsLoading(false); // * Desactivamos el loader
        setButtonText( buttonValues['initial'] ); // * Cambiamos el texto del botón
    }

    return (
        <>
            <form onSubmit={ handleSubmit } noValidate className="space-y-6 mt-6">
                {
                    loginForm.map((input, index) => (
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
                                    disabled={ isLoading }
                                />
                            </div>
                        </div>
                    ))
                }
                <div className="flex items-center justify-between px-2">
                    { rememberMeForm.map((input, index) => (
                        <div key={ index } className="flex items-center">
                            <input
                                id={ input.name }
                                name={ input.name }
                                type={ input.type }
                                ref={ input.ref }
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
                            />
                            <label htmlFor={ input.name } className="ml-3 block text-sm leading-6 text-gray-900 select-none cursor-pointer">
                                { input.label }
                            </label>
                        </div>
                    )) }
                    <div className="text-sm leading-6">
                        <Link to="/auth/recover-password" className="font-semibold text-primary-600 hover:text-primary-500">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                </div>
                <div>
                    <Button 
                        content={ buttonText }
                        type="submit"
                        appearance="primary"
                        isLoading={ isLoading }
                    />
                </div>
            </form>
            <div>
                <div className="relative mt-10">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-200" /></div>
                        <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="bg-white px-6 text-gray-900">O continúa con</span>
                    </div>
                </div>

                <div className="mt-6">
                    <Link to="/auth/register">
                        <Button 
                            content="Crea tu cuenta"
                            type="button"
                            appearance="secondary"
                            icon={ <UserPlusIcon className="h-4 w-4 mr-2 text-primary-800" /> }
                        />
                    </Link>
                </div>
            </div>
        </>
    )
}

