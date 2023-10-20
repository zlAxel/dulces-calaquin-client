
import { Outlet } from "react-router-dom"

import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export const Layout = () => {

    const { check } = useAuth(); // * Extraemos el estado de autenticación y la función para validar la sesión

    useEffect(() => {
        check(); // * Validamos si la sesión es activa
    }, [])

    return (
        <div>
            <Outlet />
        </div>
    )
}
