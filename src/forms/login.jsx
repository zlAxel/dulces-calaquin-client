
import { createRef } from "react";
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline'


// ! ----------------------------------------------------
// ! Creamos los estados de los inputs 
// ! del formulario del login
// ! ----------------------------------------------------

export const emailRef    = createRef();
export const passwordRef = createRef();
export const rememberRef = createRef();

// ! ----------------------------------------------------
// ! Creamos los inputs del formulario del login
// ! ----------------------------------------------------

const loginForm = [
    {
        label: "Correo electrónico",
        name: "email",
        type: "email",
        icon: <AtSymbolIcon className="h-4 w-4" />,
        placeholder: "Ingresa tu correo electrónico",
        ref: emailRef
    },
    {
        label: "Contraseña",
        name: "password",
        type: "password",
        icon: <LockClosedIcon className="h-4 w-4" />,
        placeholder: "Ingresa tu contraseña",
        ref: passwordRef
    }
];

export const rememberMeForm = [
    {
        label: "Recordar mi cuenta",
        name: "remember",
        type: "checkbox",
        placeholder: "Recordar mi cuenta",
        ref: rememberRef
    }
]

export default loginForm;
