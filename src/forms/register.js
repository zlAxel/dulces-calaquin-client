
import { createRef } from "react";

// ! ----------------------------------------------------
// ! Creamos los estados de los inputs 
// ! del formulario del login
// ! ----------------------------------------------------

export const nameRef                 = createRef();
export const emailRef                = createRef();
export const passwordRef             = createRef();
export const passwordConfirmationRef = createRef();

// ! ----------------------------------------------------
// ! Creamos los inputs del formulario del login
// ! ----------------------------------------------------

const loginForm = [
    {
        label: "Nombre",
        name: "name",
        type: "text",
        placeholder: "Ingresa tu nombre",
        ref: nameRef
    },
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
    },
    {
        label: "Confirmar contraseña",
        name: "password_confirmation",
        type: "password",
        placeholder: "Confirma tu contraseña",
        ref: passwordConfirmationRef
    }
];

export default loginForm;
