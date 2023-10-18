import { Link } from "react-router-dom"
import { axiosInstance } from "../../config/axios";

import loginForm, { nameRef, emailRef, passwordRef, passwordConfirmationRef } from "../../forms/register"

export const Register = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ? Obtenemos los valores de los inputs
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        };

        try {
            await axiosInstance("/sanctum/csrf-cookie");

            await axiosInstance.post("/register", datos);

        } catch (error) {
            console.log( Object.values(error.response.data.errors) );
        }
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
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form onSubmit={ handleSubmit } noValidate className="space-y-6">
                            {
                                loginForm.map((input, index) => (
                                    <div key={ index }>
                                        <label htmlFor={ input.name } className="block text-sm font-medium leading-6 text-gray-900 pl-2">
                                            { input.label }
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id={ input.name }
                                                name={ input.name }
                                                type={ input.type }
                                                placeholder={ input.placeholder }
                                                ref={ input.ref }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                            
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center mt-10 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                    Sign in
                                </button>
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

