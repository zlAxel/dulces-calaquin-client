import { FireIcon } from "@heroicons/react/20/solid"
import { useState } from "react";
import { ProductsModal } from "../components/ProductsModal"
import { ButtonApp } from "../components/utility/ButtonApp"

export const Store = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col w-full justify-center items-center gap-6 my-10">
            <h1 className="bg-gradient-to-r from-gray-500 to-primary-600 bg-clip-text font-display font-semibold text-3xl tracking-tight text-transparent">
                ¿Qué se te antoja hoy?
            </h1>
            {/* <p>
                sad
            </p> */}
            <ButtonApp 
                content="Buscar productos"
                type="button"
                appearance="primary"
                icon={ <FireIcon className="relative w-5 h-5 mr-2" /> }
                onClick={ () => setOpen(true) }
                className="mt-6"
            />
            <ProductsModal
                open={open}
                setOpen={setOpen}
            />
        </div>
    )
}

