
import { createRef } from "react";
import { UserCircleIcon, AtSymbolIcon, LockClosedIcon, FingerPrintIcon, QuestionMarkCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { TooltipApp } from "../components/TooltipApp";

// ! ----------------------------------------------------
// ! Creamos los estados de los inputs 
// ! del formulario del register
// ! ----------------------------------------------------

export const nameRef                 = createRef();
export const emailRef                = createRef();
export const passwordRef             = createRef();
export const passwordConfirmationRef = createRef();
export const pinRef                  = createRef();

const LabelPin = () => (
    <>
        <span data-tooltip-id="my-tooltip-children-multiline" className="flex items-center cursor-help">
            Pin para autorizar compras
            <QuestionMarkCircleIcon className="h-4 w-4 ml-2 text-indigo-700" />
        </span>
        <TooltipApp
            id="my-tooltip-children-multiline"
            text="El pin de compras te servirá para poder autorizar tus compras en la tienda física."
        />
    </>
);

// ! ----------------------------------------------------
// ! Creamos los inputs del formulario del register
// ! ----------------------------------------------------

const registerForm = [
    {
        label: "Nombre",
        name: "name",
        icon: <UserCircleIcon className="h-4 w-4" />,
        type: "text",
        placeholder: "Ingresa tu nombre",
        autoComplete: "name",
        ref: nameRef,
    },
    {
        label: "Correo electrónico",
        name: "email",
        type: "email",
        icon: <AtSymbolIcon className="h-4 w-4" />,
        placeholder: "Ingresa tu correo electrónico",
        autoComplete: "email",
        ref: emailRef
    },
    {
        label: "Contraseña",
        name: "password",
        type: "password",
        icon: <LockClosedIcon className="h-4 w-4" />,
        placeholder: "Ingresa tu contraseña",
        autoComplete: "current-password",
        ref: passwordRef
    },
    {
        label: "Confirmar contraseña",
        name: "password_confirmation",
        type: "password",
        icon: <LockClosedIcon className="h-4 w-4" />,
        placeholder: "Confirma tu contraseña",
        autoComplete: "current-password",
        ref: passwordConfirmationRef
    },
    {
        label: <LabelPin />,
        name: "pin",
        type: "password",
        icon: <FingerPrintIcon className="h-4 w-4" />,
        placeholder: "Ingresa tu pin",
        autoComplete: "pin",
        ref: pinRef
    },
];

export default registerForm;
