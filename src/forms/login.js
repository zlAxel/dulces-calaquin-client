
import { createRef } from "react";

// ! ----------------------------------------------------
// ! Creamos los estados de los inputs 
// ! del formulario del login
// ! ----------------------------------------------------

export const emailRef    = createRef();
export const passwordRef = createRef();

// ! ----------------------------------------------------
// ! Creamos los inputs del formulario del login
// ! ----------------------------------------------------

const loginForm = [
    {
        label: "Correo electrónico",
        name: "email",
        type: "email",
        placeholder: "Ingresa tu correo electrónico",
        ref: emailRef
    },
    {
        label: "Contraseña",
        name: "password",
        type: "password",
        placeholder: "Ingresa tu contraseña",
        ref: passwordRef
    }
];

export default loginForm;
