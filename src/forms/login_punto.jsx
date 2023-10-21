
import { createRef } from "react";
import { AtSymbolIcon, FingerPrintIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { TooltipApp } from "../components/TooltipApp";


// ! ----------------------------------------------------
// ! Creamos los estados de los inputs 
// ! del formulario del login
// ! ----------------------------------------------------

export const emailRef = createRef();
export const pinRef   = createRef();

const LabelPin = () => (
    <>
        <span data-tooltip-id="my-tooltip-children-multiline" className="flex items-center cursor-help">
            Ingresa tu pin de compras
            <QuestionMarkCircleIcon className="h-4 w-4 ml-2 text-primary-700" />
        </span>
        <TooltipApp
            id="my-tooltip-children-multiline"
            text="El pin de compras fue el que colocaste en tu registro y sirve para poder autorizar tus compras en la tienda física."
        />
    </>
);

// ! ----------------------------------------------------
// ! Creamos los inputs del formulario del login
// ! ----------------------------------------------------

export const emailForm = {
    label: "Correo electrónico",
    name: "email",
    type: "email",
    icon: <AtSymbolIcon className="h-4 w-4" />,
    placeholder: "Ingresa tu correo electrónico",
    ref: emailRef
};

export const pinForm = {
    label: <LabelPin />,
    name: "pin",
    type: "password",
    icon: <FingerPrintIcon className="h-4 w-4" />,
    placeholder: "Ingresa tu pin",
    autoComplete: "pin",
    ref: pinRef
};
